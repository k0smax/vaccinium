
function replaceTextDate() {
    //document.getElementById('date').removeAttribute('placeholder');
    document.getElementById('date').setAttribute('type', 'date');
}

function replaceDateText() {
    document.getElementById('date').setAttribute('type', 'text');
}

let arrayAge = ["4,5 месяца", '3 - 7 дней', '6 - 7 лет', '3 - 7 дней', '2 месяца', '3 месяца', '12 месяцев', '15 месяцев', '2 месяца'
                , '4,5 месяца', '3 месяца', '4,5 месяца', '6 месяцев', '18 месяцев', '3 месяца', '4,5 месяца', '6 месяцев', '18 месяцев'
                , '6 - 7 лет', '14 лет', '3 месяца', '4,5 месяца', '6 месяцев', '18 месяцев', '20 месяцев', '14 лет', '12 месяцев'
                , '6 лет', '12 месяцев', '6 лет', '12 месяцев', '6 лет'];
    
let arrayAgeNumber = [4, 3, 6, 3, 2, 3, 12, 15, 2, 4, 3, 4, 6, 18, 3, 4, 6, 18, 6, 14, 3, 4, 6, 18, 20, 14, 12, 6, 12, 6, 12, 6];

let arrayAgeToken = ['month', 'day', 'year', 'day', 'month', 'month', 'month', 'month', 'month', 'month'
                    , 'month', 'month', 'month', 'month', 'month', 'month', 'month', 'month', 'year', 'year'
                    , 'month', 'month', 'month', 'month', 'month', 'year', 'month', 'year', 'month', 'year', 'month', 'year'];

let arrayDiseased = ['Грипп', 'Туберкулёз', 'Туберкулёз', 'Гепатит B', 'Гепатит B', 'Гепатит B', 'Гепатит B'
                    , 'Гепатит B', 'Пневмококковая инфекция', 'Пневмококковая инфекция', 'Гемофильная инфекция'
                    , 'Гемофильная инфекция', 'Гемофильная инфекция', 'Гемофильная инфекция', 'Коклюш, дифтерия, столбняк'
                    , 'Коклюш, дифтерия, столбняк', 'Коклюш, дифтерия, столбняк', 'Коклюш, дифтерия, столбняк'
                    , 'Дифтерия, столбняк', 'Дифтерия, столбняк', 'Полиомиелит', 'Полиомиелит', 'Полиомиелит'
                    , 'Полиомиелит', 'Полиомиелит', 'Полиомиелит', 'Корь', 'Корь', 'Паротит', 'Паротит', 'Краснуха', 'Краснуха'];

let arrayVaccine = ['Вакцина против гриппа', 'БЦЖ-М/БЦЖ', 'БЦЖ-М/БЦЖ', 'Вакцина против Гепатита B'
                    , 'Вакцина против Гепатита B', 'Вакцина против Гепатита B', 'Вакцина против Гепатита B'
                    , 'Вакцина против Гепатита B', 'ПКВ', 'ПКВ', 'Hib', 'Hib', 'Hib', 'Hib', 'АКДС', 'АКДС', 'АКДС', 'АКДС'
                    , 'АДС-М', 'АДС-М', 'ИПВ', 'ИПВ', 'ИПВ/ОПВ', 'ИПВ', 'ИПВ/ОПВ', 'ИПВ/ОПВ', 'ККП', 'ККП', 'ККП', 'ККП', 'ККП', 'ККП'];

let arrayObjData = [];

function check() {
    let dateBirth = document.getElementById('date').value;
    if(dateBirth == false) {
        return 0;
    }
    document.querySelector('.table').style.display = "table";
    for(let i = 0; i < arrayAgeNumber.length; i++) {
        let dateVaccine = moment(dateBirth).add(arrayAgeNumber[i], arrayAgeToken[i]).format('DD.MM.YYYY') + ' <br> - <br> ' + moment(dateBirth).add(arrayAgeNumber[i] + 1, arrayAgeToken[i]).format('DD.MM.YYYY');
        let ageTd = arrayAge[i];
        let nameDiseaseTd = arrayDiseased[i];
        let nameVaccineTd = arrayVaccine[i];
        let statusTd;
        let dateSort = moment(dateBirth).add(arrayAgeNumber[i] + 1, arrayAgeToken[i]).format('YYYY-MM-DD');
        // let day = moment('1999-11-28');
        // console.log(moment(dateSort).isBefore(day));
        if(moment(dateBirth).add(arrayAgeNumber[i] + 1, arrayAgeToken[i]).isBefore()) {
            statusTd = '<img src="img/4.svg" alt="Прививка была сделана" title="Прививка была сделана" class="logo-object">';
        } else {
            statusTd = '<img src="img/5.svg" alt="Прививка будет сделана" title="Прививка будет сделана" class="logo-object">';
        }
        arrayObjData[i] = new createObjData(dateVaccine, ageTd, nameDiseaseTd, nameVaccineTd, statusTd, dateSort);
    }
    sortByDate();
}

function recordInTable(array) {
    let date = document.querySelectorAll('.date'); 
    let status = document.querySelectorAll('.status');
    let age = document.querySelectorAll('.age');
    let disease = document.querySelectorAll('.diseas');
    let vaccine = document.querySelectorAll('.vaccine');
    for(let i = 0; i < array.length; i++) {
        date[i].innerHTML = array[i].dateTd;
        status[i].innerHTML = array[i].statusTd;
        age[i].innerHTML = array[i].ageTd;
        if(screen.width < 415) {
            if(array[i].statusTd == '<img src="img/4.svg" alt="Прививка была сделана" title="Прививка была сделана" class="logo-object">') {
                disease[i].style.color = 'green';
                vaccine[i].style.color = 'green';
            } else {
                disease[i].style.color = 'red';
                vaccine[i].style.color = 'red';
            }
        }
        disease[i].innerHTML = array[i].nameDiseaseTd;
        vaccine[i].innerHTML = array[i].nameVaccineTd;
    }
}

function createObjData(date, age, nameDisease, nameVaccine, status, dateSort) {
    this.dateTd = date;
    this.ageTd = age;
    this.nameDiseaseTd = nameDisease;
    this.nameVaccineTd = nameVaccine;
    this.statusTd = status;
    
    this.dateSort = dateSort;
}

let trDisplay = document.querySelectorAll('tr');
let x = true;

function sortByDate() {
    arrayObjData.sort((a, b) => moment(b.dateSort) - moment(a.dateSort));
    if(x) {
        recordInTable(arrayObjData);
    } else {
        recordInTable(arrayObjData.reverse());
    }
    x = !x;
}

function sortByName() {
    trDisplay.forEach(element => element.style.display = 'table-row');
    arrayObjData.sort((a, b) => {
        if(a.nameDiseaseTd < b.nameDiseaseTd) {return -1;}
        if(a.nameDiseaseTd > b.nameDiseaseTd) {return  1;}
    });
    if(x) {
        recordInTable(arrayObjData);
    } else {
        recordInTable(arrayObjData.reverse());
    }
    x = !x;
}

function sortByStatus() {
    let arraySortStatus = [];
    if(x) {
        for(let i = 0; i < arrayObjData.length; i++) {
            if(arrayObjData[i].statusTd == '<img src="img/4.svg" alt="Прививка была сделана" title="Прививка была сделана" class="logo-object">') {
                arraySortStatus.push(arrayObjData[i]);
            }   
        }
    } else {
        for(let i = 0; i < arrayObjData.length; i++) {
            if(arrayObjData[i].statusTd == '<img src="img/5.svg" alt="Прививка будет сделана" title="Прививка будет сделана" class="logo-object">') {
                arraySortStatus.push(arrayObjData[i]);
            }
        }
    }
    replaceDisplayTr(arraySortStatus);
    recordInTable(arraySortStatus);
    x = !x;
}

function replaceDisplayTr(array) {
    trDisplay.forEach(element => element.style.display = 'table-row');
    for(let i = arrayObjData.length; i > array.length; i--) {
        trDisplay[i].style.display = 'none';
    }
}

let humburger = document.querySelector('#humburger');
humburger.addEventListener('click', () => {
    let menu = document.querySelector('.navigation');
    let headerNavigation = document.querySelector('.header__navigation');
    if(menu.classList.contains('active')) {
        humburger.classList.remove('active');
        menu.classList.remove('active');
        headerNavigation.classList.remove('active');
    } else {
        humburger.classList.add('active');
        menu.classList.add('active');
        headerNavigation.classList.add('active');
    }
});
// const onclickHumburger = () => {
    

// }
//let tbod = document.querySelector('tbody');
//let trLast = document.querySelector('tbody').lastElementChild;
//console.log(trLast);

// const Moment = require('moment')
// const array = [{date:"2018-05-11"},{date:"2018-05-12"},{date:"2018-05-10"}]
// const sortedArray  = array.sort((a,b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'))
// console.log(sortedArray)

// var arr = [];
// function q(dale) {
//     this.dale: dale
// };

// arr.push()

// console.log(arrayObjData);
// function getDateTd(ageFirst, ageSecond, ageToken) {
//     return (moment(dateBirth).add(ageFirst, ageToken).format('DD.MM.YYYY') + ' - ' + moment(dateBirth).add(ageSecond, ageToken).format('DD.MM.YYYY'));
// }

// let ms = Date.parse('1996-11-28');
// console.log(ms);


