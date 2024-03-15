import $ from 'jquery';
import ymaps from 'ymaps';
import Buttons from './button';

function initialize() {
	const $map = $('.cdp-map');

	const mapOptions = $map.data();

	const $form = $('.page-checkout-form');

	let map;

	ymaps
		.load('https://api-maps.yandex.ru/2.1/?apikey=af2f7264-2134-415f-ac54-54012b3217eb&lang=ru_RU')
		.then(maps => {
			map = new maps.Map($map[0], {
				center: [mapOptions.lat, mapOptions.lng],
				zoom: mapOptions.zoom,
				controls: []
			});
			map.controls.add('zoomControl');

			$('.cdp-item').each((index, item) => {
				const $item = $(item);
				const marker = new maps.Placemark([$item.data('lat'), $item.data('lng')], {}, {
					iconLayout: 'default#image',
					iconImageHref: mapOptions.icon,
					iconImageSize: [26, 38],
					iconImageOffset: [-13, -19]
				});

				map.geoObjects.add(marker);
			});
			if (map.geoObjects.getBounds()) {
				map.setBounds(map.geoObjects.getBounds());
			}
			if (map.getZoom() > 17) {
				map.setZoom(17);
			}
			$('.cdp-item').on('change', (e) => {
				const $this = $(e.currentTarget);
				map.setCenter([$this.data('lat'), $this.data('lng')]);
				map.setZoom(18);
			})
		})
		.catch(error => console.log('Failed to load Yandex Maps', error));

	$('.checkout-delivery input').on('change', (e) => {
		const $this = $(e.currentTarget);
		const $thisStep = $this.closest('.page-checkout-step');
		const $nextStep = $thisStep.next('.page-checkout-step');

		if ($this.is(':checked')) {
			if ($this.data('type') === 'pickup') {
				$('.checkout-delivery-address').hide();
				$('.checkout-delivery-pickup').show();
			} else {
				$('.checkout-delivery-pickup').hide();
				$('.checkout-delivery-address').show();
			}
			$thisStep.addClass('is-filled');
			$nextStep.addClass('is-active');
			$('.js-delivery-placeholder').hide();
			$('.js-delivery-checked').show();
			Buttons.initialize();
		}
	});

	$('.checkout-payment-comment a').on('click', (e) => {
		const $this = $(e.currentTarget);

		e.preventDefault();
		$('.checkout-payment-comment').toggleClass('is-active');
		if ($('.checkout-payment-comment').hasClass('is-active')) {
			$('.checkout-text-comment').slideDown(250);
		} else {
			$('.checkout-text-comment').slideUp(250);
		}
	});

	$('.bidc-plus').on('click', (e) => {
		const $this = $(e.currentTarget);
		const $parent = $this.closest('.bicd-counter');
		const $number = $parent.find('.bidc-number');
		const number = parseInt($number.text(), 10);

		e.preventDefault();
		$number.text(number + 1);
	});

	$('.bidc-minus').on('click', (e) => {
		const $this = $(e.currentTarget);
		const $parent = $this.closest('.bicd-counter');
		const $number = $parent.find('.bidc-number');
		const number = parseInt($number.text(), 10);

		e.preventDefault();
		$number.text(number - 1 > 1 ? number - 1 : 1);
	});

	const validator = $form.validate({
		lang: 'ru',
		submitHandler(thisForm) {
			thisForm.submit();
		},
	});

	$('.page-checkout-step-next-button').on('click', (e) => {
		const $this = $(e.currentTarget);
		const $thisStep = $this.closest('.page-checkout-step');
		const $nextStep = $thisStep.next('.page-checkout-step');

		e.preventDefault();
		if ($form.valid()) {
			$thisStep.addClass('is-filled');
			$nextStep.addClass('is-active');

			if ($nextStep.find('.cdp-map').length) {
				map.container.fitToViewport();
				setTimeout(() => {
					if (map.geoObjects.getBounds()) {
						map.setBounds(map.geoObjects.getBounds());
					}
					if (map.getZoom() > 17) {
						map.setZoom(17);
					}
				}, 150);
			}
			Buttons.initialize();
		}
	});
}

export default { initialize }
