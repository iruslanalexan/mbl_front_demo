
import $ from 'jquery';

const initialize = () => {
	const tabs = [...document.querySelectorAll('.js-tabs')];
	tabs.forEach(tab => {
		const tabTriggers = [...tab.querySelectorAll('.js-tabs-trigger')];
		const tabContent = [...tab.querySelectorAll('.js-tabs-content')];
		tabTriggers.forEach(trigger => {
			trigger.addEventListener('click', (e) => {
				e.preventDefault();
				if($(e.target).hasClass('js-reviews-section')){
					setTimeout(() => {
						window.initButtons();
					}, 50);
				}
				const curTabTrigger = e.currentTarget;
				if (curTabTrigger.classList.contains('active')) return;
				const needleContent = curTabTrigger.getAttribute('href').slice(1);
				tabContent.forEach(tc => tc.classList.remove('active'));
				tabTriggers.forEach(tabTrigger => tabTrigger.classList.remove('active'));
				curTabTrigger.classList.add('active');
				document.querySelector(`#${needleContent}`).classList.add('active');
				if ($(document.querySelector(`#${needleContent}`)).find('.swiper-container').length) {
					$(document.querySelector(`#${needleContent}`)).find('.swiper-container').data('slider').update();
				}
			});
		});
	});
};

export default {
	initialize
}
