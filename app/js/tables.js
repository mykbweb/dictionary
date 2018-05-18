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
    text: 'j',
    date: undefined,
    testDate: undefined,
    status: undefined,
    sort: 'number' // содержит настройки сортировки, по умоляанию abc
    
};
// опускаем пока момент загрузки таблицы с сервера и продолжаем с ней работать

// 1 - выясняем у пользователя с какой языковой парой он будет работать

let uploadTable = 0; // получаем индекс массива языковой пары tables[uploadTable]

let objTb; // экземпляр класса для работы с базами словарей

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
        arr = objTb.sort(tableFilters.sort);
    // перезагружаем отсортированную таблицу
//    console.log(tableFilters.sort);
//    console.log(arr);
    objTb.load(arr);
//    console.log(objTb);
    goRender();
}

let renderTableObj; // содержит экземпляр класса для отрисовки таблицы

function goRender() {
    let render = [];
    // проверяем есть ли фильтры:
    if(!tableFilters.text && !tableFilters.date && !tableFilters.testDate && !tableFilters.status) {
        // если фильтров нет рисуем таблицу...
        render = objTb.get();
    } else {
        // если есть фильтры применяем их и рисуем таблицу...
        render = objTb.filter(tableFilters);
    }
    objTb.load(render);
    
    renderTableObj = new RenderTables($('.table'), objTb.get());
    
    renderTableObj.render();
}


