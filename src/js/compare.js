import $ from 'jquery';
import Swiper from 'swiper/js/swiper.min';

function initialize() {
	const $cols = $('.page-compare__table__col');
	let dataId = 0;

	const calcHeights = () => {
		const maxHeightsArr = [];

		$cols.each((index, item) => {
			const $lines = $(item).find('.page-compare__table__col__item');

			$lines.each((lineIndex, lineItem) => {
				if (!maxHeightsArr[lineIndex]) {
					maxHeightsArr[lineIndex] = $(lineItem).outerHeight();
				} else if (maxHeightsArr[lineIndex] < $(lineItem).outerHeight()) {
					maxHeightsArr[lineIndex] = $(lineItem).outerHeight();
				}
			});
		});

		$cols.each((index, item) => {
			const $lines = $(item).find('.page-compare__table__col__item');

			$lines.each((lineIndex, lineItem) => {
				$(lineItem).css({
					height: maxHeightsArr[lineIndex],
				});
			});
		});
	};

	const slider = new Swiper($('.page-compare__table__slider .swiper-container'), {
		slidesPerView: 'auto',
		navigation: {
			prevEl: $('.page-compare__table__slider .swiper-button-prev'),
			nextEl: $('.page-compare__table__slider .swiper-button-next'),
		}
	});

	calcHeights();

	$('.js-show-differences').on('change', (e) => {
		if ($(e.currentTarget).is(':checked')) {
			$('.page-compare__table__col__item--not-differences').addClass('is-hidden');
		} else {
			$('.page-compare__table__col__item--not-differences').removeClass('is-hidden');
		}
	});

	$('.page-compare__table__fix').on('click', (e) => {
		const $this = $(e.currentTarget);
		const $thisCol = $this.closest('.page-compare__table__col');
		if ($this.hasClass('is-active')) {
			$('.page-compare__table').removeClass('is-show-fixed');
			$('.page-compare__table__fix').removeClass('is-active');
			$('.page-compare__table__slider .swiper-slide').removeClass('is-hide-slide');
			if(dataId){
				const $dataItem = $(`.swiper-slide[data-item-id="${dataId}"]`);
				$dataItem.css('display', 'block');
				dataId = 0;
			}
			$('.page-compare__table__fixed').html('');
			slider.update();
		} else {
			$('.page-compare__table__fixed').html('');
			$('.page-compare__table__fix').removeClass('is-active');
			$('.page-compare__table__slider .swiper-slide').removeClass('is-hide-slide');
			$('.page-compare__table').addClass('is-show-fixed');
			$this.addClass('is-active');
			$this.closest('.swiper-slide').addClass('is-hide-slide')
			if(dataId){
				const $dataItem = $(`.swiper-slide[data-item-id="${dataId}"]`);
				$dataItem.css('display', 'block');
			}
			dataId = $this.closest('.swiper-slide').data('item-id');
			$this.closest('.swiper-slide').css('display', 'none');
			const $clone = $thisCol.clone(true, true);
			$('.page-compare__table__fixed').append($clone);
			$clone.find('.button.is-liquid').removeClass('is-liquid');
			window.initButtons();
			slider.update();
		}
	});
}

export default { initialize }
