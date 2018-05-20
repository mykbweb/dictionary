'use strict'
let groups = {
//    'animal' : ['animal']
};

function rg() {
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
            
            let tableNameWrap = $('<p class="dictionary-groups__dictionary"></p>');
            
            let tableName = tableNameWrap
            .append(
                $('<span class="dictionary-groups__dictionary-select"></span>')
            )
            .append(mainGroupTable[i])
            .append(
                $('<span class="dictionary-groups__dictionary-words"> ('+tables[uploadTable].tables[mainGroupTable[i]].length+')</span>')
            );
            
            targetWrap.append(tableName)
        }
    }
}