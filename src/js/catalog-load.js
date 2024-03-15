// const $button = $('.filter-results-refresh.js-paginator')
let $button = $('.filter-results-refresh.js-paginator a');
const $window = $(window);

if ($button.length) {
	$window.on('scroll', () => {
		$button = $('.filter-results-refresh.js-paginator a');

		$button.each((index, item) => {
			const $item = $(item);

			if ($window.scrollTop() + $window.outerHeight() * (2 / 3) > $item.offset().top) {
				if (!$item.hasClass('is-clicked')) {
					$item.addClass('is-clicked');
					$item[0].click();
				}
			}
		});
	})
}
