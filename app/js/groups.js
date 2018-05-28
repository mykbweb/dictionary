'use strict'
let groups = {
    'животные' : ['animal']
};

function rg() {
    // удаляем все элименты и рисуем заново
    $('.dictionary-groups__content > *').remove();
    // отрисовывает группы в dictionary-groups
    // находим словари без пренадлежности к группам
    let keysGroupsTable = [];
    for(let k in groups) {
        keysGroupsTable = [...keysGroupsTable, ...groups[k]];
    }
    // теперь в массиве keysGroupsTable содержатся все словари имеющие принадлежность к группам
    let mainGroupTable = [];
    for(let k in tables[uploadTable].tables) {
        // передераем весь массив словарей
        // находим совпадения и записываем в массив если они не найдены
        let incedent = true;
        for(let i = keysGroupsTable.length; i--;) {
            if(keysGroupsTable[i] === k)
                incedent = false;
        }
        
        if(incedent) {
           mainGroupTable = [...mainGroupTable, k];
       }
        
    }
    // теперь в mainGroupTable содержатся все словари без принадлежности к группам
    // создаем переменные объектов для отрисовки таблицы
    
    let mainGroupsTables = $('<p class="dictionary-groups__name dictionary-groups__main-js"><span class="dictionary-groups__toggle">Общая (словари: <span class="dictionary-groups__tables-length">0</span>, слов: <span class="dictionary-groups__words-length">0</span>)</span> <i class="fa dictionary-groups__caret fa-caret-up" aria-hidden="true"></i><span class="dictionary-groups__selected-all"> <span class="dictionary-groups__dictionary-select"><i class="fa fa-check dictionary-groups__dictionary-select-icon"></i><i class="fa fa-circle dictionary-groups__dictionary-select-icon" aria-hidden="true"></i></span> выделить всё</span></p>'); // заголовок общей группы
    
    
    // проверяем есть ли записи в общей таблицы, и если есть рисуем группы
    let targetWrap = $('.dictionary-groups__content');
    
    if(mainGroupTable.length) {
       // рисуем заголовок
        targetWrap.append(mainGroupsTables);
        let allElementsGroupTable = $('<div class="dictionary-groups__dictionary-wrap"></div>');
        for(let i = mainGroupTable.length; i--;) {
            
            let selected = $('<span class="dictionary-groups__dictionary-select"><i class="fa fa-check dictionary-groups__dictionary-select-icon"></i></span>');
            if(tables[uploadTable].tablesName[mainGroupTable[i]]) {
                selected.addClass('checked');
           }
            
            selected.click(function() {
                if($(this).hasClass('checked')) {
                   $(this).removeClass('checked');
                    tables[uploadTable].tablesName[mainGroupTable[i]] = false;
                } else {
                    $(this).addClass('checked');
                    tables[uploadTable].tablesName[mainGroupTable[i]] = true;
                }
                checkedGroup();
            });
            
            let tableNameWrap = $('<p class="dictionary-groups__dictionary"></p>');
            
            let tableName = tableNameWrap
            .append(selected)
            .append(mainGroupTable[i])
            .append(
                $('<span class="dictionary-groups__dictionary-words"> ('+tables[uploadTable].tables[mainGroupTable[i]].length+')</span>')
            );
            
            allElementsGroupTable.append(tableName);
        }
        targetWrap.append(allElementsGroupTable);
        // добовляем события на кнопку выделить все
        $('.dictionary-groups__main-js .dictionary-groups__dictionary-select').click(function() {
            let s;
            
            if($(this).hasClass('checked')) {
               s = false;
                $(this).removeClass('checked');
                
                $(this).parents('.dictionary-groups__name').next().find('.dictionary-groups__dictionary-select').removeClass('checked');
                
            } else {
                s = true;
                $(this).addClass('checked');
                
                $(this).parents('.dictionary-groups__name').next().find('.dictionary-groups__dictionary-select').addClass('checked');
                
            }
            
            for(let i = mainGroupTable.length; i--;) {
                tables[uploadTable].tablesName[mainGroupTable[i]] = s;
            }
            checkedGroup();
        });
        
        // записываем колличество таблиц и слов в группу
        
        $('.dictionary-groups__tables-length').text(mainGroupTable.length);
        $('.dictionary-groups__words-length').text(
            () => {
                let num = 0;
                for(let i = mainGroupTable.length; i--;) {
                    num += tables[uploadTable].tables[mainGroupTable[i]].length
                }
                return num;
            }
        );
        
        checkedGroup();
        
    }
    // рисуем созданные группы
    for(let k in groups) {
        
        let groupsNameElement = $('<p class="dictionary-groups__name dictionary-groups__main-js"><span class="dictionary-groups__toggle">'+k+' (словари: <span class="dictionary-groups__tables-length">0</span>, слов: <span class="dictionary-groups__words-length">0</span>)</span> <i class="fa dictionary-groups__caret fa-caret-up" aria-hidden="true"></i><span class="dictionary-groups__selected-all"> <span class="dictionary-groups__dictionary-select"><i class="fa fa-check dictionary-groups__dictionary-select-icon"></i><i class="fa fa-circle dictionary-groups__dictionary-select-icon" aria-hidden="true"></i></span> выделить всё</span></p>'); // заголовок созданных груп
        
        let allElementsGroupTable = $('<div class="dictionary-groups__dictionary-wrap"></div>');
        
        // рисуем заголовок группы
        targetWrap.append(groupsNameElement);
        for(let i = groups[k].length; i--;) {
            let selected = $('<span class="dictionary-groups__dictionary-select"><i class="fa fa-check dictionary-groups__dictionary-select-icon"></i></span>');
            
            if(tables[uploadTable].tablesName[groups[k][i]]) {
                selected.addClass('checked');
           }
            
            selected.click(function() {
                if($(this).hasClass('checked')) {
                   $(this).removeClass('checked');
                    tables[uploadTable].tablesName[groups[k][i]] = false;
                } else {
                    $(this).addClass('checked');
                    tables[uploadTable].tablesName[groups[k][i]] = true;
                }
                checkedGroup();
            });
            
            let tableNameWrap = $('<p class="dictionary-groups__dictionary"></p>');
            
            let tableName = tableNameWrap
            .append(selected)
            .append(groups[k][i])
            .append(
                $('<span class="dictionary-groups__dictionary-words"> ('+tables[uploadTable].tables[groups[k][i]].length+')</span>')
            );
            
            
            allElementsGroupTable.append(tableName);
        }
        targetWrap.append(allElementsGroupTable);
        
        groupsNameElement.find('.dictionary-groups__dictionary-select').click(function() {
            let s;
            
            if($(this).hasClass('checked')) {
               s = false;
                $(this).removeClass('checked');
                
                $(this).parents('.dictionary-groups__name').next().find('.dictionary-groups__dictionary-select').removeClass('checked');
                
            } else {
                s = true;
                $(this).addClass('checked');
                
                $(this).parents('.dictionary-groups__name').next().find('.dictionary-groups__dictionary-select').addClass('checked');
                
            }
            
            for(let i = groups[k].length; i--;) {
                tables[uploadTable].tablesName[groups[k][i]] = s;
            }
            checkedGroup();
        });
        
        // пишем колличество таблиц и слов в заголовке группы
        groupsNameElement.find('.dictionary-groups__tables-length').text(groups[k].length);
        groupsNameElement.find('.dictionary-groups__words-length').text(
            () => {
                let num = 0;
                for(let i = groups[k].length; i--;) {
                    num += tables[uploadTable].tables[groups[k][i]].length;
                }
                return num;
            }
        );
        
        checkedGroup();
    }
    
    
    // цепляем события развернуть / свернуть группу
    
    $('.dictionary-groups__toggle').click(function() {
        let content = $(this).parents('.dictionary-groups__name').next();
        let caret = $(this).parents('.dictionary-groups__name').find('.dictionary-groups__caret');
        
            content.toggle(200, () => {
                if(caret.hasClass('fa-caret-up')) { 
                    caret.removeClass('fa-caret-up').addClass('fa-caret-down');
                } else {
                    caret.removeClass('fa-caret-down').addClass('fa-caret-up');
                }
            });

    });
    
    function checkedGroup() {
        // ставит галочки в заголовки групп меню если все пункты меню выделены
           // находим все блоки с таблицами в группах
           $('.dictionary-groups__dictionary-wrap').each(function() {
               if($(this).find('.dictionary-groups__dictionary-select').length == $(this).find('.checked').length) {
                   $(this).prev().find('.dictionary-groups__dictionary-select').addClass('checked')
                   .removeClass('some-checked');
               } else if($(this).find('.checked').length) {
                   $(this).prev().find('.dictionary-groups__dictionary-select').removeClass('checked')
                   .addClass('some-checked');
               } else {
                   $(this).prev().find('.dictionary-groups__dictionary-select').removeClass('checked')
                   .removeClass('some-checked');
               }
           });
    }

    
}


// события на страницы
$(function() {
    $(".filters__search-options-dictionary-js").click(function() {
        // отрисовка групп
        rg();
        $("#dictionary-groups").toggleClass('popup-show');
    });
    $('.popup__close').click(function() {
        $(this).parents(".popup-wrap").toggleClass('popup-show');
    });
    $('#dictionary-groups .popup__close').click(function() {
        // отрисовка таблицы при загрытии попапа с группами
        rt();
        rlt();
    });
});