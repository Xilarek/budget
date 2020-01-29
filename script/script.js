'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит ?'),
    mission = 50000,
    period = 3;

let showTypeof = function (item) {
    console.log(typeof item);
};
showTypeof(money);
showTypeof(income);
showTypeof(deposit);


let start = function () {

    do {
        money = prompt('Ваш месячный доход ?');
    }
    while (!isNumber(money));
};
let moneyStart = start();


addExpenses = addExpenses.toLocaleLowerCase().split(',');
let expenses = [];

//Функция суммый обязательных  расходов за месяц 
const getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');
        let cost = 0;
        do {
            cost = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(cost));
        sum += +cost;
    }

    return sum;

};
let expensesAmount = getExpensesMonth();
console.log('expensesAmount:', expensesAmount);

//Функция расчета накоплений за месяц 
const getAccumulatedMonth = function () {
    return money - expensesAmount;
};


let accumulation = getAccumulatedMonth();
let budgetDay = Math.floor(accumulation / 30);

console.log('accumulation:', accumulation);

//Функция расчета достижения цели 
const getTargetMonth = function () {
    let missionMonth = Math.ceil(mission / accumulation);
    if (missionMonth <= 0 || missionMonth === Infinity) {
        console.log('Цель не будет достигнута');
    } else {
        console.log('Цель будет достигнута');
    }
    return missionMonth;
};
let missionMonth = getTargetMonth();
console.log('missionMonth:', missionMonth);

const getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода!';
    }
    if (budgetDay >= 600 || budgetDay < 1200) {
        return 'У вас средний уровень дохода';

    }
    if (budgetDay < 600 && budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';

    }
    if (budgetDay <= 0) {
        return 'Что-то пошло не так';
    }
};
let getStatus = getStatusIncome();
console.log('getStatus:', getStatus);
console.log('месячный доход ' + money);
console.log(addExpenses);
console.log('Обязательные расходы ' + expensesAmount);
console.log('Период равен ' + period + ' месяцев');
console.log('Бюджет на день ' + budgetDay);
console.log('Цель заработать ' + mission + 'рублей');