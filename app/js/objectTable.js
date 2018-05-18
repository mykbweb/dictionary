// массив объектов словаря
//let table = [
//    {
//        id: 0,
//        word: 'apple',
//        translate: 'яблоко',
//        variants: 'dfhgsd, sdfhgsd, sdfh',
//        sound: false,
//        date: 2463242343,
//        testDate: 342623212,
//        dictionary: 'dictionary 1',
//        status: 0
//    },
//    {
//        id: 1,
//        word: 'work',
//        translate: 'работа',
//        variants: 'dfhgsd, sdfhgsd, sdfh',
//        sound: false,
//        date: 135147347,
//        testDate: 3457341236,
//        dictionary: 'dictionary 1',
//        status: 1
//    },
//    {
//        id: 2,
//        word: 'hope',
//        translate: 'надеяться',
//        variants: 'dfhgsd, sdfhgsd, sdfh',
//        sound: false,
//        date: 2472423562,
//        testDate: 987654,
//        dictionary: 'dictionary 1',
//        status: -2
//    }
//];
// класс для работы с массивом словаря
 class Tb {
     constructor(serverTime) {
         // принимает дату с сервера, для синхронизации с датой и временем пользователя.
         this.serverStatus = false; // состояние обновления таблицы
         this.dateTime = new Date().getTime();
         this.corTime = serverTime - this.dateTime; // поправка времени относительно серверного
         this.addStatus = false; // статус выполнения ajax запросов на сервер
     }
     load(value) {
         // загрузка таблицы
         // проверка на ошибки
         if (typeof value !== 'object') {
             console.error('table it\'s not object or array');
             value = this.tableArray;
         }
         value.forEach((e, i) => {
             if (!e.word || !(typeof e.id === 'number') || !e.date || !e.dictionary) {
                 console.error(`it's not validation object in table ${i}`);
                 value = this.tableArray;
             }
         });
             this.tableArray = value;
     }
     add(value) {
         // загрузка нового слова/слов
         // принимает одно значение или массив значений
         
         // расчитуем дату записи с учетом поправки сервера
         let date = new Date().getTime() + this.corTime;
         if(typeof value === 'object' && value.length) {
             //перебираем массив
             let length = value.length;
             let count = 0;
             let them = this;
             this.addStatus = true;
             (function addArrayWord() {
                 if(count < length)
                     them.addSingle(value[count], date, addArrayWord);
                 count++;
                 if(count > length){
                     them.addStatus = false;
//                     console.log('add status it is false');
                 }
             }());
             
             this.serverStatus = true;
         } else if(value) {
             //добавляем слово
             this.addStatus = true;
             this.addSingle(value, date, undefined);
         } else {
             console.error('error push elements table');
             this.serverStatus = true;
         }
     }
     addSingle(value, date, them) {
         //добовляет одно слово в словарь
         //проверка существования таблицы
         if(!this.tableArray) 
             return false;

         //эмулируем асинхронный запрос на сервер

         setTimeout(() => {
             // добовляем слово в словарь
            this.write(value, 'translate', 'wrgw, wertw, ertwertwer, rtwrt', date);
             
            if(them) {
                them();
            } else {
                // выполняется после выполнения всех запросов на добавления слов
                this.addStatus = false;
//                this.endAdd(() => console.log('testing upload server...'));
            }
         }, Math.random() * 3000);
         
     }
     write(word, translate, variants, date) {
         // записывает слово в словарь
        this.tableArray[this.tableArray.length] = {
            id: this.tableArray.length,
            word: word,
            translate: translate,
            variants: variants,
            sound: false,
            date: date,
            testDate: undefined,
            dictionary: 'dictionary 1',
            status: 0
        }
     }
     
     endAdd(f) {
         // метод будет вызван по окончанию всех текущих запросов на сервер
         f();
     }
     
     sort(variant) {
         // копируем массив в новый и изминяем его...
         let newArr = [];
         this.tableArray.forEach((e, i) => {
             newArr[i] = this.tableArray[i];
         });
         function abc(a, b) {
             if(a.word < b.word)
                 return -1;
             else if(a.word > b.word)
                 return 1;
             return 0;
         }
         function cba(a, b) {
             if(a.word > b.word)
                 return -1;
             else if(a.word < b.word)
                 return 1;
             return 0;
         }
         function numberReverse(a, b) {
             if(a.id > b.id)
                 return -1;
             else if(a.id < b.id)
                 return 1;
             return 0;
         }
         function number(a, b) {
             if(a.id < b.id)
                 return -1;
             else if(a.id > b.id)
                 return 1;
             return 0;
         }
         function date(a, b) {
             if(a.date < b.date)
                 return -1;
             else if(a.date > b.date)
                 return 1;
             return 0;
         }
         function dateReverse(a, b) {
             if(a.date > b.date)
                 return -1;
             else if(a.date < b.date)
                 return 1;
             return 0;
         }
         function status(a, b) {
             if(a.status < b.status)
                 return -1;
             else if(a.status > b.status)
                 return 1;
             return 0;
         }
         function statusReverse(a, b) {
             if(a.status > b.status)
                 return -1;
             else if(a.status < b.status)
                 return 1;
             return 0;
         }
         function testDate(a, b) {
             if(a.testDate < b.testDate)
                 return -1;
             else if(a.testDate > b.testDate)
                 return 1;
             return 0;
         }
         function testDateReverse(a, b) {
             if(a.testDate > b.testDate)
                 return -1;
             else if(a.testDate < b.testDate)
                 return 1;
             return 0;
         }
        switch(variant) {
             case 'abc':
            return newArr.sort(abc);
             break;
             case 'cba':
             return newArr.sort(abc);
             break;
             case 'numberReverse':
             return newArr.sort(numberReverse);
             break;
             case 'number':
             return newArr.sort(number);
             break;
             case 'date':
             return newArr.sort(date);
             break;
             case 'dateReverse':
             return newArr.sort(dateReverse);
             break;
             case 'status':
             return newArr.sort(status);
             break;
             case 'statusReverse':
             return newArr.sort(statusReverse);
             break;
             case 'testDate':
             return newArr.sort(testDate);
             break;
             case 'testDateReverse':
             return newArr.sort(testDateReverse);
             break;
             default:
            return newArr.sort(abc);
             
         }
     }
     
     filter(value) {
         // фильтрует слова с таблицы по заданным параметрам
         
//         if (value)
//             return false;
         
         let newArr = [];
         let filterArr = [];
         if(value.date) {
            this.tableArray.forEach(function(e) {
                if(e.date >= value.date[0] && e.date <= value.date[1])
                    newArr[newArr.length] = e;
            });
        }
         if(value.testDate) {
             if(newArr.length) {
                 filterArr = [];
                newArr.forEach(function(e) {
                    if(e.testDate >= value.testDate[0] && e.testDate <= value.testDate[1])
                        filterArr[filterArr.length] = e;
                });
                 newArr = filterArr;
             } else {
                this.tableArray.forEach(function(e) {
                    if(e.testDate >= value.testDate[0] && e.testDate <= value.testDate[1])
                        newArr[newArr.length] = e;
                });
             }
         }
         if(value.status) {
             if(newArr.length) {
                 filterArr = [];
                newArr.forEach(function(e) {
                    if(e.status >= value.status[0] && e.status <= value.status[1])
                        filterArr[filterArr.length] = e;
                });
                 newArr = filterArr;
             } else {
                this.tableArray.forEach(function(e) {
                    if(e.status >= value.status[0] && e.status <= value.status[1])
                        newArr[newArr.length] = e;
                });
             }
         }
        if(value.text) {
             if(newArr.length) {
                 filterArr = [];
                newArr.forEach(function(e) {
                    if(e.word.indexOf(value.text)+1 || e.translate.indexOf(value.text)+1)
                        filterArr[filterArr.length] = e;
                });
                 newArr = filterArr;
             } else {
                this.tableArray.forEach(function(e) {
                    if(e.word.indexOf(value.text)+1 || e.translate.indexOf(value.text)+1)
                        newArr[newArr.length] = e;
                });
             }
         }
            
         return newArr;
     }
     
     remove(n) {
         let ar = [];
         this.tableArray[n] = undefined;
         
         this.tableArray.forEach(function(i) {
             this.tableArray.id = i;
             ar[ar.length] = this.tableArray
         });
     }
     
     get() {
         // возвращает таблицу, которая в данный момент записана в экземпляре класса
         return this.tableArray;
     }
     
     get status() {
         return this.serverStatus;
     }
     
     set status(value) {
         this.serverStatus = value;
     }
};


//let tb1 = new Tb(1525538732910);
//
//tb1.load(table);
//tb1.add('dgsdfg');

//console.log(tb1.filter({status: [-1,10]}));



















