let tables = [];
// массив объектов словаря
// тестовый массив
tables[0] = {
    translate: 'en - ru',
    tablesName: {
        // ключи видимости таблиц
        'work': true,
        'animal': true
    },
    tables: {
        // содержит массив объектов словарей, с теми же именами, что и в tablesName
        'work': [
        {
            id: 0,
            word: 'job',
            translate: 'работа',
            variants: 'работа, задание, труд, место работы, занятие, служба',
            sound: false,
            date: 2463242343,
            testDate: undefined,
            dictionary: 'work',
            status: 0
        },
        {
            id: 1,
            word: 'work',
            translate: 'работа',
            variants: 'работа, труд, произведение, дело, дела, сочинение',
            sound: false,
            date: 135147347,
            testDate: undefined,
            dictionary: 'work',
            status: 1
        }
    ],
    'animal': [
        {
            id: 0,
            word: 'dog',
            translate: 'собака',
            variants: '',
            sound: false,
            date: 2463242343,
            testDate: undefined,
            dictionary: 'animal',
            status: 0
        },
        {
            id: 1,
            word: 'crocodile',
            translate: 'крокодил',
            variants: 'крокодил, гулянье парами',
            sound: false,
            date: 135147347,
            testDate: undefined,
            dictionary: 'animal',
            status: 1
        }
    ]
    }
};

let tableFilters = {
    // содержит настройки фильтров для отрисовки таблиц
    text: '',
    date: undefined,
    testDate: undefined,
    status: undefined,
    sort: undefined // содержит настройки сортировки, по умоляанию abc
    
};
// опускаем пока момент загрузки таблицы с сервера и продолжаем с ней работать

// 1 - выясняем у пользователя с какой языковой парой он будет работать

let uploadTable = 0; // получаем индекс массива языковой пары tables[uploadTable]

//// создаем объект с экзымпляром классов Tb
//let tbObject = {}; // будет содержать экземпляры класса Tb под разные словари

let objTb;

function rt() {
    // собираем все необходимые настройки и рисуем таблицу...
    
    // сливаем все необходимые таблицы в одну...
    let arr = [];
    // находим все таблицы необходимые для показа
    for(let k in tables[uploadTable].tablesName) {
        if(tables[uploadTable].tablesName[k]) {
            arr = [...arr,...tables[uploadTable].tables[k]];
        }
    }
    // теперь все необходимые таблицы в arr массиве
    // создаем экземпляр класса для работы с массивом словаря, это глобальный объект
    objTb = new Tb(3251461);
    objTb.load(arr); // добавляем словари
    // сортируем массив если сортировка не указана, тогда по умолчанию
    if(!tableFilters.sort)
        arr = objTb.sort("abc");
    else
        arr = objTb.sort("abc");
    // перезагружаем отсортированную таблицу
    objTb.load(arr);
}
function goRender() {
    // проверяем есть ли фильтры:
    if(!tableFilters.text && !tableFilters.date && !tableFilters.testDate && !tableFilters.status) {
        // если фильтров нет рисуем таблицу...
    } else {
        // если есть фильтры применяем их и рисуем таблицу...
    }
}
rt();
//if(tables.length) {
//    // если есть таблица языковой пары
//    if(tables[0].tables !== undefined) {
//        // если в какой то языковой паре есть хоть одна таблица
//        // создаем объект с экземплярами класса Tb 
//        
//        for(let key in tables[uploadTable].tables) {
//            tbObject[key] = new Tb(1525538732910); tbObject[key].load(tables[uploadTable].tables[key]); // цыфры это время на сервери в мс
//        }
//        
//        
//        
//    }
//        
//}
