import $ from 'jquery';
import ymaps from 'ymaps';

function initialize() {
    const $map = $('.cdp-map');

    const mapOptions = $map.data();

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
}

export default { initialize }