import ymaps from 'ymaps';
import $ from 'jquery';
import axios from 'axios';

const mapNode = document.querySelector('.js-map');

function getMapDots(){
    const $mapItems = $('.js-product-page-map');
    const dotsArray = [];
    if($mapItems.length){
        $mapItems.each(function (){
            const tempItem = $(this).data('map-value');
            const itemItemSplit = tempItem.split(',');
            dotsArray.push(itemItemSplit);
        });
    }
    return dotsArray;
}

function redrawShowInfo(id){
    return axios.get(
        'http://localhost/local/php_interface/api/templates/mapdata/',
        {
            params:{
                storeId: id
            }
        }
    ).then((resp)=>{
        const $fullBody = $(resp.data.fullBody);
        const $currentBody = $('.js-mapdata-info');
        $currentBody.html($fullBody.html());
    });
}

function getFirstItemInfo(){
    const $firstItem = $('.js-product-page-map').first();
    return $firstItem.data('item-id');
}

function initZoom(map){
    const $mapItems = $('.js-product-page-map');
    $mapItems.on('click', function (){
        const coords = $(this).data('map-value');
        const id = $(this).data('item-id');
        const coordsAr = coords.split(',');
        redrawShowInfo(id);
        map.panTo([coordsAr]);
    });
}

function initialize() {
    const curDotsArray = getMapDots();
    const center = curDotsArray[0] || [48.4751112, 135.0856752];
    redrawShowInfo(getFirstItemInfo());
    ymaps
        .load('https://api-maps.yandex.ru/2.1/?apikey=af2f7264-2134-415f-ac54-54012b3217eb&lang=ru_RU')
        .then(maps => {
            const map = new maps.Map(mapNode, {
            center,
            zoom: 13,
            controls: []
            });
			map.controls.add('zoomControl');
            initZoom(map);
            if(curDotsArray) {
                curDotsArray.forEach(item => {
                    const pm = new maps.Placemark(item, {}, {
                        iconLayout: 'default#image',
                        iconImageHref: '/frontend/build/img/pin.svg',
                        iconImageSize: [26, 38],
                        iconImageOffset: [-13, -19]
                    });
                    map.geoObjects.add(pm);
                });
            } else {
                const pm = new maps.Placemark([48.4751112, 135.0856752], {}, {
                    iconLayout: 'default#image',
                    iconImageHref: '/frontend/build/img/pin.svg',
                    iconImageSize: [26, 38],
                    iconImageOffset: [-13, -19]
                });
                map.geoObjects.add(pm);
            }

    })
    .catch(error => console.log('Failed to load Yandex Maps', error));
}

export default { initialize }
