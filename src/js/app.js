/* global ratyOptions, ymaps, dataLayer */

import './detectie';
import 'url-polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Swiper from 'swiper/js/swiper.min';
import { fancybox } from '@fancyapps/fancybox';
import inputmask from 'inputmask/dist/jquery.inputmask';
import select2 from 'select2';
import { raty } from 'raty-js';
import ymaps from 'ymaps';
import axios from "axios";
import Header from './header';
import Contacts from './contacts';
import Shops from './shops';
import CatalogFilter from './catalog-filter';
import Accordion from './accordion';
import Tabs from './tabs';
import VideoPlay from './video';
import Popups from './popups';
import Compare from './compare';
import Cookie from './cookies';
import Forms from './forms';
import Subscribe from './subscribe';
import Checkout from './checkout';
import Buttons from './button';
import Maps from './map';
import CDP from './cdp-map';
import './catalog-load';

svg4everybody();

window.$ = $;
window.jQuery = $;

window.initButtons = Buttons.initialize;
window.Accordion = Accordion;
window.initMaps = Maps.initialize;
window.initCdp = CDP.initialize;

const getURLParam = (param, url) => {
	if (url) {
		return new URL(url).searchParams.get(param);
	}

	return new URL(window.location.href).searchParams.get(param);
};

$(document).ready(() => {
	const dropdownTriggers = document.querySelectorAll('.js-dropdown-trigger');
	const dropdownCloses = document.querySelectorAll('.js-dropdown-close');
	const contactsMap = document.querySelector('.contacts-map');
	const catalogFilter = document.querySelector('.js-catalog-filter');
	const $catalogFilter = $(catalogFilter);
	const $catalogFilterFixed = $catalogFilter.closest('.filters-fixed');
	const $selectCity = $('.js-select-city');
	const $articleSelect = $('.article-select');

	window.addEventListener('load', () => {
		document.body.classList.add('loaded');
	});

	if ($catalogFilter.length) {
		$(window).on('scroll.fixedFilter', () => {
			if ($(window).scrollTop() > $catalogFilterFixed.offset().top - $('.site-header').outerHeight() && $(window).scrollTop() < $('.js-filter-results').offset().top + $('.js-filter-results').outerHeight() - 100) {
				$catalogFilter.addClass('is-fixed');
			} else {
				$catalogFilter.removeClass('is-fixed');
			}
		});
	}

	if (document.querySelector('.page-shops')) {
		Shops.initialize();
	}

	window.getUrlParams = function(sParam) {
		const sPageURL = window.location.search.substring(1);
		const sURLVariables = sPageURL.split('&');
		for (let i = 0; i < sURLVariables.length; i++)
		{
			const sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] === sParam)
			{
				return sParameterName[1];
			}
		}
		return '';
	}

	const subscribeAction = window.getUrlParams('ACTION');
	const subscribeId = window.getUrlParams('ID');
	const subscribeConfirmCode = window.getUrlParams('CONFIRM_CODE');

	if(parseInt(subscribeId, 10) > 0 && subscribeAction === 'unsubscribe' && subscribeConfirmCode){
		axios.get(
			'/local/php_interface/api/',
			{
				params:{
					mode: 9,
					ID: subscribeId,
					CONFIRM_CODE: subscribeConfirmCode,
					ACTION: subscribeAction,
				}
			}
		).then((resp) => {
			if(resp.data.result){
				$.fancybox.open(
					`<div class="modal modal--success">
					<div class="modal__text">${resp.data.result}</div>
				</div>`,
					{
						touch: false,
						autoFocus: false,
					});
				setTimeout(() => {
					$.fancybox.close();
				}, 3000);
			}
		});
	}

	window.initButtons();

	window.openFancyBox = function(item) {
		$.fancybox.open({
				src: item,
				touch: false,
			}
		);
	}

	window.quickViewInit = function() {
		$('.fancybox-container:visible .product').each((index, item) => {
			const $item = $(item);

			const productSwiper = new Swiper($item.find('.p-gallery .swiper-container'), {
				slidesPerView: 'auto',
				spaceBetween: 8,
				roundLengths: true,
				loop: true,
				loopPreventsSlide: false,
				centeredSlides: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}
			});

			$item.find('.p-gallery .swiper-container').data('slider', productSwiper);
			if($item.find('.p-image .swiper-container .swiper-slide').length > 1){
				const productSwiperImage = new Swiper($item.find('.p-image .swiper-container'), {
					slidesPerView: 'auto',
					loop: true,
					loopPreventsSlide: false,
					thumbs: {
						swiper: productSwiper,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				});

				$item.find('.p-image .swiper-container').data('slider', productSwiperImage);

				$(window).on('load', () => {
					if(typeof productSwiper !== 'undefined'){
						productSwiper.update();
						productSwiperImage.update();
					}
				});
			}
		});
	}

	$('[data-fancybox]').fancybox({
		touch: false,
		autoFocus: false,
		backFocus: false,
		afterShow() {
			$('.fancybox-container:visible .product').each((index, item) => {
				const $item = $(item);

				const productSwiper = new Swiper($item.find('.p-gallery .swiper-container'), {
					slidesPerView: 'auto',
					spaceBetween: 8,
					roundLengths: true,
					loop: true,
					loopPreventsSlide: false,
					centeredSlides: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				});

				$item.find('.p-gallery .swiper-container').data('slider', productSwiper);
				if($item.find('.p-image .swiper-container .swiper-slide').length > 1){
					const productSwiperImage = new Swiper($item.find('.p-image .swiper-container'), {
						slidesPerView: 'auto',
						loop: true,
						loopPreventsSlide: false,
						thumbs: {
							swiper: productSwiper,
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						}
					});

					$item.find('.p-image .swiper-container').data('slider', productSwiperImage);

					$(window).on('load', () => {
						if(typeof productSwiper !== 'undefined'){
							productSwiper.update();
							productSwiperImage.update();
						}
					});
				}
			});
			$('.fancybox-container:visible .swiper-container').each((index, item) => {
				const $item = $(item);

				if ($item.data('slider')) {
					$item.data('slider').update();
				}
			});
			if ($('.fancybox-container:visible .popup-pickup-map').length) {
				const $map = $('.popup-pickup-map');
				if ($map.data('map').geoObjects.getBounds()) {
					$map.data('map').setBounds($map.data('map').geoObjects.getBounds());
				}
				if ($map.data('map').getZoom() > 17) {
					$map.data('map').setZoom(17);
				}
			}
			window.initButtons();
		},
	});

	window.jsStarsInit = function(){
		const ratyOptions = {
			starHalf: '/frontend/build/img/star-red.svg',
			starOff: '/frontend/build/img/star-empty.svg',
			starOn: '/frontend/build/img/star-red.svg',
		};
		$('.js-stars').each((index, item) => {
			const $item = $(item);
			$item.raty({
				starHalf: ratyOptions.starHalf,
				starOff: ratyOptions.starOff,
				starOn: ratyOptions.starOn,
				score() {
					return $item.data('rating');
				},
				readOnly() {
					return $item.attr('data-readOnly') === '1';
				},
			});
			$item.find('input[name="score"]').prop('type', 'text').prop('required', true);
		});
	}

	if($('.js-stars').length > 0){
		window.jsStarsInit();
	}

	Header.initEvents();
	if (contactsMap) {
		Contacts.initialize();
	}

	if (catalogFilter) {
		CatalogFilter.initialize(catalogFilter.getAttribute('data-filter-to'));
	}

	if ($('div').hasClass('main-page-slider')) {
		$('.site-header').addClass('bg-color');
	}

	if ($('.page-section').hasClass('basket-items')) {
		$('.basket-items').addClass('cat-angle');
	}

	const Acc = new Accordion();
	Acc.initialize();

	Popups.initialize();
	Tabs.initialize();
	VideoPlay.initialize();

	$('.slider').each((index, item) => {
		const $item = $(item);
		const swiper = new Swiper($item.find('.swiper-container'), {
			loop: true,
			slidesPerView: 'auto',
			spaceBetween: 8,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: $item.find('.swiper-button-next'),
				prevEl: $item.find('.swiper-button-prev'),
			}
		});

		$item.find('.swiper-button-next, .swiper-button-prev').hover(
			(e) => {
				$(e.currentTarget).trigger('click');
			},
			() => { }
		);

		$(window).on('load', () => {
			setTimeout(() => {
				swiper.update();
			}, 250);
		});
	});

	$('.review-slider').each((index, item) => {
		const $item = $(item);
		const swiper = new Swiper($item.find('.swiper-container'), {
			slidesPerView: 1,
			spaceBetween: 8,
			allowTouchMove: false,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: $item.find('.swiper-button-next'),
				prevEl: $item.find('.swiper-button-prev'),
			}
		});

		$item.find('.swiper-container').data('slider', swiper);

		$item.find('.swiper-button-next, .swiper-button-prev').hover(
			(e) => {
				$(e.currentTarget).trigger('click');
			},
			() => { }
		);

		$(window).on('load', () => {
			setTimeout(() => {
				swiper.update();
			}, 250);
		});
	});

	if ($('.page-compare').length) {
		Compare.initialize();
	}

	Cookie.initialize();
	Subscribe.initialize();
	Forms.initialize();

	const mainPageSwiper = new Swiper('.main-page-slider .swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		}
	});

	$('.product:visible').each((index, item) => {
		const $item = $(item);

		const productSwiper = new Swiper($item.find('.p-gallery .swiper-container'), {
			slidesPerView: 'auto',
			spaceBetween: 8,
			roundLengths: true,
			loop: true,
			loopPreventsSlide: false,
			centeredSlides: true,
			navigation: {
				nextEl: $item.find('.p-gallery').find('.swiper-button-next'),
				prevEl: $item.find('.p-gallery').find('.swiper-button-prev'),
			}
		});

		$item.find('.p-gallery .swiper-container').data('slider', productSwiper);
		if($item.find('.p-image .swiper-container .swiper-slide').length > 1){
			const productSwiperImage = new Swiper($item.find('.p-image .swiper-container'), {
				slidesPerView: 'auto',
				loop: true,
				loopPreventsSlide: false,
				thumbs: {
					swiper: productSwiper,
				},
				navigation: {
					nextEl: $item.find('.p-image').find('.swiper-button-next'),
					prevEl: $item.find('.p-image').find('.swiper-button-prev'),
				}
			});

			$item.find('.p-image .swiper-container').data('slider', productSwiperImage);

			$(window).on('load', () => {
				if(typeof productSwiper !== 'undefined'){
					productSwiper.update();
					productSwiperImage.update();
				}
			});
		}
	});

	$('.cards-gallery').each((index, item) => {
		const $item = $(item);

		const cardsSwiper = new Swiper($item.find('.swiper-container'), {
			loop: false,
			slidesPerView: 'auto',
			freeMode: true,
			navigation: {
				nextEl: $item.find('.swiper-button-next'),
				prevEl: $item.find('.swiper-button-prev'),
			},
			breakpoints: {
				768: {
					freeMode: false,
					// loop: true,
				}
			}
		});

		cardsSwiper.on('slideChangeTransitionEnd', function () {
			window.bLazy.revalidate();
		});

		$item.find('.swiper-button-next, .swiper-button-prev').hover(
			(e) => {
				$(e.currentTarget).trigger('click');
			},
			() => { }
		);
	})

	$('.carousel').each((index, item) => {
		const $item = $(item);

		const carouselSwiper = new Swiper($item.find('.swiper-container'), {
			// loop: true,
			slidesPerView: 'auto',
			spaceBetween: 32,
			navigation: {
				nextEl: $item.find('.swiper-button-next'),
				prevEl: $item.find('.swiper-button-prev'),
			}
		});
		$item.find('.swiper-container').data('slider', carouselSwiper);
	});

	window.phoneInit = function() {
		$('input#phone, input.js-phone').inputmask("+7(999)-999-99-99", {
			clearIncomplete: false,
			clearMaskOnLostFocus: false,
		});
	}

	$('input#phone, input.js-phone').inputmask("+7(999)-999-99-99", {
		clearIncomplete: true,
	});

	[...dropdownTriggers].forEach(trigger => {
		trigger.addEventListener('click', (e) => {
			const $this = $(e.currentTarget);

			e.preventDefault();
			if ($this.hasClass('active')) {
				$this.removeClass('active');
			} else {
				$('.js-dropdown-trigger').removeClass('active');
				$this.addClass('active');
			}
		});
	});

	[...dropdownCloses].forEach(closeButton => {
		closeButton.addEventListener('click', (e) => {
			e.preventDefault();
			const dropdown = e.currentTarget.closest('.js-dropdown');
			const trigger = dropdown.closest('.js-dropdown-trigger') || dropdown.previousElementSibling;
			if (trigger) trigger.classList.remove('active');
		})
	});

	$(document).on('click', (e) => {
		const $target = $(e.target);
		if (!$target.closest('.js-dropdown').length && !$target.closest('.js-dropdown-trigger').length && !$target.hasClass('js-change-city')) {
			$('.js-dropdown-trigger').removeClass('active');
		}
	});

	window.initSelect2 = function(){
		$('.js-select-metro').select2({
			placeholder: 'Выберите ваш город',
			selectOnClose: false,
			language: {
				noResults(){
					return "Ничего не найдено";
				},
			},
		});
	}

	$selectCity.select2({
		placeholder: 'Выберите ваш город',
		selectOnClose: false,
		language: {
			noResults(){
				return "Ничего не найдено";
			},
		},
	});

	$('.js-city-desktop-current').on('click', function (){
		axios.get(
			'/local/php_interface/api/',
			{
				params:{
					mode: 12,
				}
			}
		).then((resp)=>{
			$('.js-city-desktop-select').empty();
			$('.js-city-desktop-select').append(resp.data.result);
		});
	});

	$('.js-city-mobile-current').on('click', function (){
		axios.get(
			'/local/php_interface/api/',
			{
				params:{
					mode: 12,
				}
			}
		).then((resp)=>{
			$('.js-city-mobile-select').empty();
			$('.js-city-mobile-select').append(resp.data.result);
		});
	});

	$articleSelect.select2({
		placeholder: 'Выберите ваш город',
		selectOnClose: false,
		language: {
			noResults(){
				return "Ничего не найдено";
			},
		},
	});

	$('.reviews-select').select2({
		selectOnClose: false,
		language: {
			noResults(){
				return "Ничего не найдено";
			},
		},
	});
	$('.form-row select').select2({
		selectOnClose: false,
		language: {
			noResults(){
				return "Ничего не найдено";
			},
		},
	});

	$('.js-show-or-hide').on('click', (e) => {
		const $this = $(e.currentTarget);

		e.preventDefault();
		$this.toggleClass('is-active');
		if ($this.hasClass('is-active')) {
			$($this.data('target')).stop().slideDown(250);
			$this.text($this.data('on'));
		} else {
			$($this.data('target')).stop().slideUp(250);
			$this.text($this.data('off'));
		}
	});

	$(document).on('click', '.js-add-to-fav', (e) => {
		const $this = $(e.currentTarget);

		e.preventDefault();
		$this.toggleClass('is-active');

		if ($this.find('.button-icon-text').length) {
			const $text = $this.find('.button-icon-text');

			if ($this.hasClass('is-active')) {
				$text.text($text.data('on'));
			} else {
				$text.text($text.data('off'));
			}
		}
	});

	$('.js-change-city').on('click', (e) => {
		e.preventDefault();
		$('.city-selector:visible').addClass('active');
	});

	$('.js-change-city').on('click', (e) => {
		e.preventDefault();
		$('.city-selector:visible').addClass('active');
	});

	if (getURLParam('change-city')) {
		localStorage.cityAgree = 'yes';
	}
	if (localStorage.cityAgree !== 'yes') {
		setTimeout(() => {
			$('.city-selector:visible').addClass('active');
		}, 2000);
	}

	$('.go-up').on('click', (e) => {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});

	$(window).on('scroll', () => {
		if ($(window).scrollTop() > 100) {
			$('.go-up').addClass('is-show');
		} else {
			$('.go-up').removeClass('is-show');
		}
	}).trigger('scroll');

	if ($('.page-checkout').length) {
		Checkout.initialize();
	}

	$('.site-header .search-input').on('keyup', (e) => {
		const $this = $(e.currentTarget);
		const $form = $this.closest('form');
		const $result = $form.find('.search-form__result');
		if ($this.val().length > 2) {
			axios.get(
				'/search/',
				{
					params:{
						isAjax: 'Y',
						q: $this.val(),
						where: 'iblock_catalog',
					}
				}
			).
			then((resp) => {
				if(resp.data.items){
					const {BX} = window;
					const $body = $('.js-search-items');
					const resultItems = BX.processHTML(resp.data.items, false);
					const $items = $(resultItems.HTML);
					$body.empty();
					$body.append($items);
					BX.ajax.processScripts(resultItems.SCRIPT);
					const $link = $('.search-form__result__link a');
					const sections = resp.data.searchSections;
					const $sectionsList = $('.search-form__result__cats');
					$sectionsList.empty();
					sections.forEach(item => {
						const sectionLink = `<li><a href="${item.SECTION_PAGE_URL}">${item.NAME}</a></li>`;
						$sectionsList.append($(sectionLink));
					});
					$link.attr('href', `/search/?q=${  $this.val()  }&where=iblock_catalog`);
					$result.show();
					setTimeout(() => {
						window.initButtons();
					}, 100);
				}
			});
		} else {
			$result.hide();
		}
	});

	$(document).on('click', (e) => {
		const $target = $(e.target);
		if (!$target.closest('.site-header .search-form').length) {
			$('.search-form__result').hide();
		}
	});

	setTimeout(() => {
		$('.js-users-online').removeClass('is-hidden');
	}, 2000);

	if($('.popup-pickup-map').length) {
    ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=af2f7264-2134-415f-ac54-54012b3217eb&lang=ru_RU')
      .then(maps => {
        const map = new maps.Map(document.querySelector('.popup-pickup-map'), {
          center: [48.4751112, 135.0856752],
          zoom: 7,
          controls: []
        });
        map.controls.add('zoomControl');
        const markers = [];

        $('.popup-pickup-map-item').each((index, item) => {
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

        $('.popup-pickup-map').data('map', map);
      })
      .catch(error => console.log('Failed to load Yandex Maps', error));
  }

	$('.download-doc').on('click', (e) => {
    dataLayer.push({
      'event':'Download',
      'eventCategory':'Download',
      'eventAction':'click',
      'eventLabel': $(e.currentTarget).find('.download-doc-name').text()
    });
  });

	$('.footer-socials-link').on('click', (e) => {
    dataLayer.push({
      'event':'Social',
      'eventCategory':'Social',
      'eventAction':'click',
      'eventLabel': $(e.currentTarget).data('name')
    });
  });
});
