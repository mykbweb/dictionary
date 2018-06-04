
let set = {
    tableCol: {
        'date': true,
        'dateTest': false,
        'status': false,
        'table': true,
        'select': true,
        'header': true
    }
}
function tableColWisible() {
    // скрывает или показывает колонки таблицы в зависимости от настроек
    // проверка даты
    if(set.tableCol['date']) {
        $('.words__date').removeClass('hide');
        $('.filters__options-date-col').addClass('active');
    } else {
        $('.words__date').addClass('hide');
        $('.filters__options-date-col').removeClass('active');
    }
    // проверка даты прохождения теста
    if(set.tableCol['dateTest']) {
        $('.words__testDate').removeClass('hide');
        $('.filters__options-datetest-col').addClass('active');
    } else {
        $('.words__testDate').addClass('hide');
        $('.filters__options-datetest-col').removeClass('active');
    }
    // проверка статуса
    if(set.tableCol['status']) {
        $('.words__status').removeClass('hide');
        $('.filters__options-status-col').addClass('active');
    } else {
        $('.words__status').addClass('hide');
        $('.filters__options-status-col').removeClass('active');
    }
    // проверка принадлежности к таблице
    if(set.tableCol['table']) {
        $('.words__dictionary').removeClass('hide');
        $('.filters__options-tablename-col').addClass('active');
    } else {
        $('.words__dictionary').addClass('hide');
        $('.filters__options-tablename-col').removeClass('active');
    }
    // проверка выбора слов
    if(set.tableCol['select']) {
        $('.words__select').removeClass('hide');
        $('.filters__options-wordselect-col').addClass('active');
    } else {
        $('.words__select').addClass('hide');
        $('.filters__options-wordselect-col').removeClass('active');
    }
    // проверка выбора слов
    if(set.tableCol['header']) {
        $('.words_header').removeClass('hide');
        $('.filters__options-tableheader').addClass('active');
    } else {
        $('.words_header').addClass('hide');
        $('.filters__options-tableheader').removeClass('active');
    }
}
$(function() {
// конпка для развертывание настроек отрисовки таблицы
    $('.filters__setting-btn').click(function() {
        let them = this;
        
       $('.filters__options').toggle(200, function() {
            if(!$('.filters__options').filter(':hidden').length) {
               $(them).addClass('active');
               $(them).find('.fa').removeClass('fa-caret-down');
               $(them).find('.fa').addClass('fa-caret-up');
           } else {
               $(them).removeClass('active');
               $(them).find('.fa').addClass('fa-caret-down');
               $(them).find('.fa').removeClass('fa-caret-up');
           }
       });
   });
    // кнопки подпунктов настроек
    $('.filters__options-header-btn').click(function() {
        
        $('.filters__options-header-btn').not($(this)).removeClass('active');
        
        $(this).addClass('active');
        
        let f = $(this).data('for');
        
        $('.filters__options-btns').not($(f)).removeClass('active');
        
        $(f).addClass('active');
        
    });
    
    

    $('.filters__options-date-col').click(function() {
        wisibleColCheckClick(this, 'date');
    });
    $('.filters__options-datetest-col').click(function() {
        wisibleColCheckClick(this, 'dateTest');
    });
    $('.filters__options-status-col').click(function() {
        wisibleColCheckClick(this, 'status');
    });
    $('.filters__options-tablename-col').click(function() {
        wisibleColCheckClick(this, 'table');
    });
    $('.filters__options-wordselect-col').click(function() {
        wisibleColCheckClick(this, 'select');
    });
    $('.filters__options-tableheader').click(function() {
        wisibleColCheckClick(this, 'header');
    });
     function wisibleColCheckClick(them, name) {
        if($(them).hasClass('active')) {
           $(them).removeClass('active');
            set.tableCol[name] = false;
        } else {
           $(them).addClass('active');
            set.tableCol[name] = true;
        }
        tableColWisible();
     }

});