'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {

        do {
            money = prompt('Ваш месячный доход ?');
        }
        while (!isNumber(money));
    };
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит ?');

        let sum = 0;
        let cost = 0;

        for (let i = 0; i < 2; i++) {

            let question = prompt('Введите обязательную статью расходов');

            do {
                cost = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(cost));
            sum = +cost;
            appData.expenses[question] = sum;

        }
        return sum;
    },
    //Функция суммый обязательных  расходов за месяц 
    getExpensesMonth: function () {
        let sum = 0; 
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
            appData.expensesMonth = sum;
            console.log(appData.expensesMonth);
            return;
        }

    },
    //Функция расчета накоплений за месяц 
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return;


    },
    //Функция расчета достижения цели 
    getTargetMonth: function () {
        let missionMonth = Math.ceil(appData.mission / appData.budgetMonth);
        if (missionMonth <= 0 || missionMonth === Infinity) {
            return 'Цель не будет достигнута';
        } else {
            return missionMonth;
        }

    },
    //Функция статуса дохода
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода!';
        }
        if (appData.budgetDay >= 600 || appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';

        }
        if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';

        }
        if (appData.budgetDay <= 0) {
            return 'Что-то пошло не так';
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

let expensesMonth = appData.getExpensesMonth();
console.log('expensesMonth:', expensesMonth);


let accumulation = appData.getBudget();
console.log('accumulation:', accumulation);


let missionMonth = appData.getTargetMonth();
console.log('missionMonth:', missionMonth);


let getStatus = appData.getStatusIncome();

console.log(appData.expenses);
console.log('getStatus:', getStatus);
console.log('месячный доход ' + appData.budget);
console.log(appData.addExpenses);
console.log('Обязательные расходы ' + appData.expensesMonth);
console.log('Период равен ' + appData.period + ' месяцев');
console.log('Бюджет на день ' + appData.budgetDay);
console.log('Цель заработать ' + appData.mission + 'рублей');