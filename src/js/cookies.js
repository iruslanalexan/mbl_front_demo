import $ from 'jquery';
import Buttons from './button';

function initialize() {
	const $cookie = $('.cookies');

	if (localStorage.cookiesAgree !== 'yes') {
		setTimeout(() => {
			$cookie.fadeIn(250);
			Buttons.initialize();
		}, 2000);
	}
	$cookie.find('.cookies__btn button').on('click', (e) => {
		e.preventDefault();
		localStorage.cookiesAgree = 'yes';
		$cookie.fadeOut(250);
	});
};

export default {
  initialize
}