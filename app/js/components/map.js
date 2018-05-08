// Группы объектов
var groups = [
    {
        name: "Адреса кафе",
        style: "islands#orangeFoodIcon",
        items: [
            {
                center: [47.228500, 39.703539],
                name: "ул. Лермонтовская, 50/67",
                address: "",
                tel: "+7 (961) 330-11-09",
                time: "пн-вс: 10:00 - 23:00"
            },
            {
                center: [47.287637, 39.709164],
                name: "бул. Комарова, 9",
                address: "м-н Северный",
                tel: "+7 (919) 898-46-96",
                time: "пн-вс: 10:00 - 23:00"
            },
            {
                center: [47.208712, 39.629888],
                name: "пр. Коммунистический, 32",
                address: "м-н Западный",
                tel: "+7 (919) 898-44-65",
                time: "пн-вс: 10:00 - 23:00"
            }
        ]
    }
];

// Безопасно подгружаем АПИ Яндекс Карт
(function ($) {
    $.getScript(
        "https://api-maps.yandex.ru/2.1/?lang=ru_RU",
        function () {
            ymaps.ready(init);
        });
})(jQuery);

function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
        center: [47.228500, 39.703539],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
    });


    // Контейнер для меню.
    menu = $('<div class="map__menu"/>');

    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup(group) {
        // Пункт меню.
        var submenu = $('<ul class="submenu"/>'),
            // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, {preset: group.style});

        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);
        // Добавляем подменю.
        submenu
            // Добавляем пункт в меню.
            .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            .find('a')
            .bind('click', function () {
                if (collection.getParent()) {
                    myMap.geoObjects.remove(collection);
                    submenu.hide();
                } else {
                    myMap.geoObjects.add(collection);
                    submenu.show();
                }
            });
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu);
        }
    }

    function createSubMenu(item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<li><a href="#"><h4>' + item.name + '</h4><span>' +  item.address + '</span></span></a><div><a href="tel:' + item.tel + '">' + item.tel + '</a></div><div><p>Время работы: ' + item.time + '</p></div></li>'),
            // Создаем метку.
            placemark = new ymaps.Placemark(item.center, {balloonContentHeader: item.name, balloonContentBody: item.address});

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
            });
    }

    // Добавляем меню в тэг MAP.
    menu.appendTo($('#contacts-map'));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());
}