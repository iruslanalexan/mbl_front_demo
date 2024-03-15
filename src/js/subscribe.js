import $ from 'jquery';
import Buttons from './button';

function initialize() {
	const $subscribe = $('.subscribe');
	const $subscribeForm = $('.js-subscribe-form');

	if (localStorage.subscribeClose !== 'yes') {
		setTimeout(() => {
			$subscribe.fadeIn(250);
			Buttons.initialize();
		}, 2000);
	}
	$subscribe.find('.subscribe__close, .subscribe__later').on('click', (e) => {
		e.preventDefault();
		localStorage.subscribeClose = 'yes';
		$subscribe.fadeOut(250);
	});
};

export default {
  initialize
}