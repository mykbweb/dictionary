'use strict'
class RenderTables {
    constructor(el, table) {
        this.el = el;
        this.table = table;
    }
    render() {
        // создаем элименты таблицы
        let them = this;
        $(this.el).children().remove();
//        this.table.length
        for(let i = (tableFilters.str - 1) * tableFilters.number; i < this.table.length && i < tableFilters.str * tableFilters.number; i++) {
            createElements(i);
        }
//        console.log((tableFilters.str - 1) * tableFilters.number);
        function createElements(n) {
            
            let dateWordObject = new Date(them.table[n].date);
            let dateWord;
            if (them.table[n].date)
                dateWord = `${dateWordObject.getDay()}.${dateWordObject.getMonth()}.${dateWordObject.getFullYear()} ${dateWordObject.getHours()}:${dateWordObject.getMinutes()}`;
            else
                dateWord = '---------';
            
            let dateTestObject = new Date(them.table[n].testDate);
            let dateTest;
            if (them.table[n].testDate)
                dateTest = `${dateTestObject.getDay()}.${dateTestObject.getMonth()}.${dateTestObject.getFullYear()} ${dateTestObject.getHours()}:${dateTestObject.getMinutes()}`;
            else
                dateTest = '---------';
            // пишем элименты
            let wrap = $('<div class="words"></div>');
            
            let select = $(`<div class="words__select" data-delect="[\'${them.table[n].dictionary}\', ${them.table[n].id}]"></div>`);
            
            let word = $(`<div class="words__word">${them.table[n].word}</div>`);
            
            let translate = $(`<div class="words__translate">${them.table[n].translate}</div>`);
            
            let date = $(`<div class="words__date">${dateWord}</div>`);
            
            let testDate = $(`<div class="words__testDate">${dateTest}</div>`);
            
            let status = $(`<div class="words__status">${them.table[n].status}</div>`);
            
            let dictionary = $(`<div class="words__dictionary">${them.table[n].dictionary}</div>`);
            

            wrap
            .append(select)
            .append(word)
            .append(translate)
            .append(date)
            .append(testDate)
            .append(status)
            .append(dictionary);

            them.el.append(wrap);
        }
    }
    set(table){
        this.table = table;
    }
}
//let elem = new RenderTables($('.table'), tb1.get());