'use strict'

// рисуем выбранные таблицы
function rlt() {
    // очищаем списки таблиц
    $('.filters__list-select *').remove();
    let count = 0;
    for (let k in tables[uploadTable].tablesName) {
        if (tables[uploadTable].tablesName[k]) {
            count++;
            // рисуем...
            let btn = $('<p class="filters__dictionary-select" data-close="'+k+'">'+k+'<i class="fa fa-times filters__dictionary-select-close"></i></p>');
            
            btn.children('.filters__dictionary-select-close').click(function() {

                
                tables[uploadTable].tablesName[k] = false;
                rlt();
                rt();
            });
            
            $('.filters__list-select').append(btn);
        }
    }
    // записываем колличество выбранных страниц в кнопку
    $('.filters__dictionary-list-size').text(count);
}


$(function() {
    // скрываем подключенные таблицы
    $('.filters__list-select').hide();
    // показываем подключенные таблицы
    $('.filters__search-options-dictionary-list-js').click(function() {
        let them = this;
        $('.filters__list-select').toggle(500, function() {
            if($(this).filter(':visible').length) {
                // рисуем на кнопке стрелочку вверх...
                $(them).find('.fa-caret-down')
                    .removeClass('fa-caret-down')
                    .addClass('fa-caret-up');
            } else {
                // рисуем на кнопке стрелочку вниз...
                $(them).find('.fa-caret-up')
                    .removeClass('fa-caret-up')
                    .addClass('fa-caret-down');
            }
            
        });
    });
});











