/* global dataLayer */

import $ from 'jquery';
import 'jquery-validation';
import '../../node_modules/jquery-validation/dist/additional-methods';
import '../../node_modules/jquery-validation/dist/localization/messages_ru';

$.validator.addMethod('filessize', function (value, element, param) {
	let sum = 0;

	for (let index = 0; index < element.files.length; index++) {
		sum += element.files[index].size;
	}
    return this.optional(element) || (sum <= param * 1000000)
}, 'Объем файлов не может превышать {0} Mb');

$.validator.addMethod('filescount', function (value, element, param) {
    return this.optional(element) || (element.files.length <= param)
}, 'Количество файлов не должно превышать {0} шт');

function initialize() {

	$(document).on('change', '.form-file input[type="file"]', (e) => {
		const $this = $(e.currentTarget);

		const $parent = $this.closest('.form-file');

		const $label = $parent.find('.form-file-text');

		if (e.target.files.length === 0) {
			$label.text($label.data('off'));
		} else if (e.target.files.length === 1) {
			$label.text(e.target.files[0].name);
		} else {
			$label.text(`${$label.data('on')} ${e.target.files.length}`);
		}
	});

	$('.js-form').each((index, form) => {
		let $form = $(form);
		const target = $form.data('target');
		if ($form.find('form').length) {
			$form = $form.find('form');
		}
		const validator = $form.validate({
			lang: 'ru',
			rules: {
				'files[]': {
					filessize: 5,
					filescount: 5,
				}
			},
			submitHandler(thisForm) {
				if ($form.data('type') === 'submit') {
					thisForm.submit();
				} else {
					let preparedData;
					let processData;
					let contentType;
					let useFiles = false;
					$form.removeClass('is-sended is-error');
					const $fileInput = $('.js-form-file-input');
					if (typeof $fileInput !== "undefined" && typeof $fileInput.prop('files')!== "undefined") {
						preparedData = new FormData($form.get()[0]);
						processData = false;
						contentType = false;
						if($fileInput.prop('files').length > 0) {
							useFiles = true;
						}
					}
					let serializedForm = $form.serialize();
					if($form.data('type') === 'AddBasket') {
						serializedForm += '&mode=3';
					} else if($form.data('type') === 'OrderProduct') {
						const currentProduct = localStorage.getItem('order_product_key');
						const currentProductPrice = localStorage.getItem('order_product_price_text');
						localStorage.removeItem("order_product_key");
						if(currentProductPrice){
							localStorage.removeItem("order_product_price_text");
							serializedForm += `&form_text_12=${currentProductPrice}`;
						}
						serializedForm += `&form_text_9=${currentProduct}`;
						serializedForm += '&mode=4';
					}
					$.ajax({
						type: useFiles ? 'POST' : 'GET',
						url: $form.attr('action'),
						data: useFiles ? preparedData : serializedForm,
						dataType: 'json',
						processData,
						contentType,
						success(result) {
							if (result.result === true) {
								$form[0].reset();
								if (target) {
                  dataLayer.push({
                    'event': target,
                    'eventCategory': target,
                    'eventAction': 'send'
                  });
                }
							}
							if ($form.data('success') === 'this') {
								$form.addClass('is-success-send');
								$form.find('.js-form-success-text').text(result.message);
								setTimeout(() => {
									$.fancybox.close();
									$('.js-dropdown-trigger').removeClass('active');
									setTimeout(() => {
										$form.removeClass('is-success-send');
									}, 250);
								}, 3000);
							} else {
								if (result.result === true) {
									$.fancybox.close();
								}
								$.fancybox.open(`<div class="modal modal--success">
									<div class="modal__text">${result.message}</div>
								</div>`, {
									touch: false,
									autoFocus: false,
								});
								setTimeout(() => {
									$form.removeClass('is-success-send');
									$.fancybox.close();
									$('.js-dropdown-trigger').removeClass('active');
								}, 3000);
							}
						},
					});
				}
			},
		});
	});
};

export default {
  initialize
}
