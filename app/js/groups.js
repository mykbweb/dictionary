'use strict'
let groups = {
    'animal' : ['animal']
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
    
    let mainGroupsTables = $('<p class="dictionary-groups__name">Общая</p>'); // заголовок общей группы
    
    
    // проверяем есть ли записи в общей таблицы, и если есть рисуем группы
    let targetWrap = $('.dictionary-groups__content');
    
    if(mainGroupTable.length) {
       // рисуем заголовок
        targetWrap.append(mainGroupsTables);
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
            });
            
            let tableNameWrap = $('<p class="dictionary-groups__dictionary"></p>');
            
            let tableName = tableNameWrap
            .append(selected)
            .append(mainGroupTable[i])
            .append(
                $('<span class="dictionary-groups__dictionary-words"> ('+tables[uploadTable].tables[mainGroupTable[i]].length+')</span>')
            );
            
            targetWrap.append(tableName);
        }
    }
    // рисуем созданные группы
    for(let k in groups) {
         let groupsNameElement = $('<p class="dictionary-groups__name">'+k+'</p>');
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
            });
            
            let tableNameWrap = $('<p class="dictionary-groups__dictionary"></p>');
            
            let tableName = tableNameWrap
            .append(selected)
            .append(groups[k][i])
            .append(
                $('<span class="dictionary-groups__dictionary-words"> ('+tables[uploadTable].tables[groups[k][i]].length+')</span>')
            );
            
            targetWrap.append(tableName);
            
        }
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
})