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
    },
    //Функция суммый обязательных  расходов за месяц 
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }

    },
    //Функция расчета накоплений за месяц 
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
console.log('Обязательные расходы на месяц:', appData.expensesMonth);


appData.getBudget();
console.log('Бюджет на месяц:', appData.budgetMonth);


let missionMonth = appData.getTargetMonth();
console.log('Будет реализованно за:', missionMonth);


let getStatus = appData.getStatusIncome();

for ( let key in appData) {

    console.log('Наша программа включает в себя ' +key +' ' +appData[key]);
}