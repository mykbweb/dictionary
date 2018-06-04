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
    
    let btnAdd = $('<div class="filters__dictionary-select-all"><i class="fa fa-plus" aria-hidden="true"></i> выбрать</div>');
    
    btnAdd.click(() => $(".filters__search-options-dictionary-js").trigger('click'));

    $('.filters__list-select').append(btnAdd);
}


$(function() {
    
    // плагин выбора даты
     $('#filters__date-min').datetimepicker({
  format:'Y/m/d',
         onSelectDate: function(ct,$i){
            inputDate();
        },
  onShow:function( ct ){
   this.setOptions({
    maxDate:jQuery('#filters__date-max').val()?jQuery('#filters__date-max').val():false
   })
  },
  timepicker:false
 });
 $('#filters__date-max').datetimepicker({
  format:'Y/m/d',
         onSelectDate: function(ct,$i){
            inputDate();
        },
  onShow:function( ct ){
   this.setOptions({
    minDate:jQuery('#filters__date-min').val()?jQuery('#filters__date-min').val():false
   })
  },
  timepicker:false
 });
    
    $('#filters__date-min, #filters__date-max').change(function() {
        if(!$('#filters__date-min').val() || !$('#filters__date-max').val()) {
               inputDate();
           }
    });
    
    
    function inputDate(){
        let r = /\d+\/\d+\/\d+/i;
        // проверка необходимости перезаписи фильтров и отрисовке табл
        if(r.test($('#filters__date-min').val()) && r.test($('#filters__date-max').val())) {
            
            let date1 = new Date(...$('#filters__date-min').val().split('/'));
            let date2 = new Date(...$('#filters__date-max').val().split('/'));
            
            date1 = date1.getTime();
            date2 = date2.getTime();
            
            if(tableFilters.date) {
                
                if(tableFilters.date[0] != date1 || tableFilters.date[1] != date2) {
                   tableFilters.date = [];
                    tableFilters.date[0] = date1;
                    tableFilters.date[1] = date2;
                    // произошла перезапись, перерисовываем таблицу заново
                    rt();
                    
                   }

               } else {
                   tableFilters.date = [];
                    tableFilters.date[0] = date1;
                    tableFilters.date[1] = date2;
                    // произошла перезапись, перерисовываем таблицу заново
                    rt();
                   
               }
           } else {
               tableFilters.date = undefined;
               rt();
           }
        
    }
    
    function minMaxDateWord() {
        // минимальное и максимальное значение даты для словарей.
        // необходимо чтобы задать границы выбора в каллендаре
        let arrDateMin,
            arrDateMax;
        for(let k in tables[uploadTable].tablesName) {
            if(tables[uploadTable].tablesName[k]) {
                
                let min = tables[uploadTable].tables[k][0].date;
                let max = tables[uploadTable].tables[k][(tables[uploadTable].tables[k].length - 1)].date;
                
                if(arrDateMin) {
                    
                    if(min < arrDateMin) {
                        arrDateMin = min;
                       }
                    
                } else {
                    arrDateMin = min;
                }
                       
                if(arrDateMax) {
                    
                    if(max > arrDateMax) {
                       rrDateMax = max;
                       }
                        
                } else {
                    arrDateMax = max; 
                }
            }
        }
    }
    
    
    // скрываем подключенные таблицы
    $('.filters__list-select').hide();
    // показываем подключенные таблицы
    $('.filters__search-options-dictionary-list-js').click(function() {
        let them = this;
        $('.filters__list-select').toggle(200, function() {
            if($(this).filter(':visible').length) {
                // рисуем на кнопке стрелочку вверх...
                $(them).find('.fa-caret-down')
                    .removeClass('fa-caret-down')
                    .addClass('fa-caret-up');
                $(them).addClass('active');
            } else {
                // рисуем на кнопке стрелочку вниз...
                $(them).find('.fa-caret-up')
                    .removeClass('fa-caret-up')
                    .addClass('fa-caret-down');
                $(them).removeClass('active');
            }
            
        });
    });
});











