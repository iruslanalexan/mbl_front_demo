import ymaps from 'ymaps';
import select2 from 'select2';

const mapNode = document.querySelector('.js-map');

function initialize() {
	$('.page-shops__header__select select').select2({
		selectOnClose: false,
		language: {
			noResults(){
				return "Ничего не найдено";
			},
		},
	});
	ymaps
		.load('https://api-maps.yandex.ru/2.1/?apikey=af2f7264-2134-415f-ac54-54012b3217eb&lang=ru_RU')
		.then(maps => {
			const map = new maps.Map(mapNode, {
				center: [48.4751112, 135.0856752],
				zoom: 7,
				controls: []
			});
			map.controls.add('zoomControl');

			const markers = [];

			$('.js-map-item').each((index, item) => {
				const $item = $(item);

				const itemOptions = $item.data();

				let schedule = '<ul class="page-shops__schedule">';

				itemOptions.schedule.forEach((scheduleItem) => {
					schedule += `<li>
					<b class="page-shops__schedule__key">${scheduleItem[0]}</b>
					<span class="page-shops__schedule__value">${scheduleItem[1]}</span>
				</li>`;
				});
				schedule += '</ul>';

				const pm = new maps.Placemark([$item.data('lat'), $item.data('lng')], {
					balloonContentHeader: itemOptions.name,
					balloonContentBody: `<div class="page-shops__map__address">${itemOptions.address}</div>
									${schedule}`,
				}, {
					iconLayout: 'default#image',
					iconImageHref: $item.data('pin'),
					iconImageSize: [26, 38],
					iconImageOffset: [-13, -19]
				});
				markers[index] = pm;
				map.geoObjects.add(pm);
			});
			if (map.geoObjects.getBounds()) {
				map.setBounds(map.geoObjects.getBounds());
			}
			if (map.getZoom() > 17) {
				map.setZoom(17);
			}

			$('.page-shops__header__type a').on('click', (e) => {
				const $this = $(e.currentTarget);

				e.preventDefault();
				if (!$this.hasClass('is-active')) {
					$('.page-shops__header__type a').removeClass('is-active');
					$('.page-shops__pane').removeClass('is-active');
					$this.addClass('is-active');
					$(`.page-shops__pane[data-pane="${$this.data('pane')}"]`).addClass('is-active');

					if ($this.data('pane') === 'map') {
						setTimeout(() => {
							if (map.geoObjects.getBounds()) {
								map.setBounds(map.geoObjects.getBounds());
							}
							if (map.getZoom() > 17) {
								map.setZoom(17);
							}
						}, 150);
					}
				}
			});

			$('.js-show-on-map').on('click', (e) => {
				const $this = $(e.currentTarget);

				e.preventDefault();
				$('.page-shops__header__type a[data-pane="map"]').trigger('click');
				setTimeout(() => {
					markers[$this.data('id')].balloon.open();
				}, 250);
			});
			$('.page-shops__header__select select').on('change', (e) => {
				const $selectedOption = $(e.currentTarget).find('option:selected');
				const cityId = parseInt($selectedOption.data('city-id'), 10);
				if(cityId) {
					window.location.href = `?select_city=${  cityId}`;
				} else {
					window.location.href = '/pickup/';
				}
			});
		})
		.catch(error => console.log('Failed to load Yandex Maps', error));
}

export default { initialize }
