'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {

        do {
            money = prompt('Ваш месячный доход ?', 50000);
        }
        while (!isNumber(money));
    };
//start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    precentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть у вас дополнительный заработок ?')) {
            let itemIncome = prompt('Какой у вас есть дополнительный заработок ?', 'такси');
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете ?', 5000);
            if ((typeof (itemIncome) === 'string' && itemIncome !== null) &&
                isNumber(cashIncome)) {
                appData.income[itemIncome.trim()] = cashIncome.trim();
            } else {
                alert('Ошибка при заполнении одного из полей');
                appData.asking();
            }
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кот', 'собака');
        appData.addExpenses =appData.addExpenses.trim().split(', ');
        let str;

        function conversionArrey(str) {
            if (!str) {
                return;
            }
            return str[0].toUpperCase() + str.slice(1);
        }
        for (let i = 0; i < appData.addExpenses.length; i++) {
            appData.addExpenses[i] = appData.addExpenses[i].trim();
        }
        for (let i = 0; i < appData.addExpenses.length; i++) {
            if (i === appData.addExpenses.length - 1) {
                str += conversionArrey(appData.addExpenses[i]);
            } else {
                str += conversionArrey(appData.addExpenses[i]) + ', ';
            }
        }
        console.log('ЗАДАНИЕ8:' + str);

        let sum = 0;
        let cost = 0;

        for (let i = 0; i < 2; i++) {

            let question = prompt('Введите обязательную статью расходов', 'квартира');
            if (typeof (question) === 'string' && question !== null) {

                do {
                    cost = prompt('Во сколько это обойдется?', '5000');
                }
                while (!isNumber(cost));
                sum = +cost;
                appData.expenses[question] = sum;
            } else {
                alert('Ошибка при вводе статьи обязательных расходов');
                appData.asking();
            }

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
    },
    getInfoDeposit: function () {
        do {
            appData.precentDeposit = prompt('Какой годовой процент ?', '10');
        } while (!isNumber(appData.precentDeposit));
        do {
            appData.moneyDeposit = prompt('Кака сумма заложена ?', 10000);
        } while (!isNumber(appData.moneyDeposit));
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }

};

/*appData.asking();

appData.getExpensesMonth();
console.log('Обязательные расходы на месяц:', appData.expensesMonth);


appData.getBudget();
console.log('Бюджет на месяц:', appData.budgetMonth);


let missionMonth = appData.getTargetMonth();
console.log('Будет реализованно за:', missionMonth);


let getStatus = appData.getStatusIncome();
console.log('Будет реализованно за:', getStatus);
for (let key in appData) {
    console.log('Наша программа включает в себя ' + key + ' ' + appData[key]);
}*/


let calculate = document.getElementById('start');
let bottonPlusOne = document.getElementsByTagName('button')[0];
let bottonPlusTwo = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#checkmark');
let  additionalIncome = document.querySelectorAll('.additional_income-item');
let budgetDay = document.querySelector('.budget_day-value');
let expensesMonth = document.querySelector('.expenses_month-value');
let additionalIncom = document.querySelector('.additional_income-value');
let additionalExpenses = document.querySelector('.additional_expenses-value');
let incomePeriod = document.querySelector('.income_period-value');
let targetMonth = document.querySelector('.target_month-value');
let budgetMonth = document.querySelector('.salary-amount');
let itemIncome = document.querySelector('.income-titles');
let cashIncome = document.querySelector('.income-amount');
let expenses = document.querySelectorAll('.additional_income-item');
let expensesAmount = document.querySelectorAll('.expenses-amount');
let possibleExpenses = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let period = document.querySelector('.period-select');


console.log(calculate);
console.log(bottonPlusOne);
console.log(bottonPlusTwo);
console.log(checkBox);
console.log(additionalIncome);
console.log(budgetDay);
console.log(expensesMonth);
console.log(additionalIncom);
console.log(additionalExpenses);
console.log(incomePeriod);
console.log(targetMonth);
console.log(budgetMonth);
console.log(itemIncome);
console.log(cashIncome);
console.log(expenses);
console.log(expensesAmount);
console.log(possibleExpenses);
console.log(targetAmount);
console.log(period);

