'use strict'

// рисуем выбранные таблицы
function rlt() {
    // очищаем списки таблиц
    $('.filters__list-select *').remove();
    for (let k in tables[uploadTable].tablesName) {
        if (tables[uploadTable].tablesName[k]) {
            // рисуем...
            let btn = $('<p class="filters__dictionary-select" data-close="'+k+'">'+k+'<i class="fa fa-times filters__dictionary-select-close"></i></p>');
            
            btn.children('.filters__dictionary-select-close').click(function() {
//                console.log($(this).parent().data().close);
                tables[uploadTable].tablesName[k] = false;
                rlt();
                rt();
            });
            
            $('.filters__list-select').append(btn);
        }
    }
}


$(function() {
    // показываем подключенные таблицы
    $('.filters__dictionary-list').click(function() {
//        let toggle = $('.filters__list-select').filter(':hidden').length;
        $('.filters__list-select').toggle(500);
    });
});