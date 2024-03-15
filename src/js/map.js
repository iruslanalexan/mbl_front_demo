import ymaps from 'ymaps';

function initialize() {
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
            const $mapResult = $('.popup-pickup-map');
            if($mapResult.find('.ymaps-2-1-77-map').length > 2){
                $mapResult.find('.ymaps-2-1-77-map').first().remove();
            }
        })
        .catch(error => console.log('Failed to load Yandex Maps', error));
}

export default { initialize }