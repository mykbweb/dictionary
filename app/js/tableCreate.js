'use strict'
class RenderTables {
    constructor(el, table) {
        this.el = el;
        this.table = table;
    }
    render() {
        // рисуем шапку таблицы
        let tableHeader = $('<div class="words words_header"></div>');
        
        tableHeader.html('<div class="words__select"></div><div class="words__word">слово</div><div class="words__translate">перевод</div><div class="words__date">дата записи</div><div class="words__testDate">дата теста</div><div class="words__status">статус</div><div class="words__dictionary">словари</div>');
        
        // создаем элименты таблицы
        let them = this;
        $(this.el).children().remove();
        for(let i = (tableFilters.str - 1) * tableFilters.number; i < this.table.length && i < tableFilters.str * tableFilters.number; i++) {
            createElements(i);
        }
        
        $(this.el).prepend(tableHeader);
        
        
        tableColWisible();
        function createElements(n) {
            
            let dateWordObject = new Date(them.table[n].date);
            let dateWord;
            if (them.table[n].date)
                dateWord = `${dateWordObject.getFullYear()}/${dateWordObject.getMonth() +1}/${dateWordObject.getDate()}`;
            else
                dateWord = '---------';
            
            let dateTestObject = new Date(them.table[n].testDate);
            let dateTest;
            if (them.table[n].testDate)
                dateTest = `${dateTestObject.getFullYear()}/${dateTestObject.getMonth() +1}/${dateTestObject.getDate()}`;
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