'use strict';
const start = document.getElementById('start'),
    cansel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    checkBox = document.getElementById('deposit-check'),
    expensesTitle = document.querySelector('.expenses-title'),
    itemIncome = document.querySelector('.income-titles'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    cashIncome = document.querySelector('.income-amount'),
    targetMonthValue = document.querySelector('.target_month-value'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    additionalIncomValue = document.querySelector('.additional_income-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('[type="range"]'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),
    accamulatedMonthValue = document.getElementsByTagName('accumulated_month-value')[0],
    expensesItems = document.querySelectorAll('.expenses-items'),
    leftInputs = document.querySelectorAll('.data input[type=text]'),
    allInputs = document.querySelectorAll('input'),
    incomeItems = document.querySelectorAll('.income-items');


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
class AppData {
    constructor(income = {}, incomeMonth = 0, addIncome = [], expenses = {}, addExpenses = [], deposit = 0, precentDeposit = 0,
        moneyDeposit = 0, mission = 0, budget = false, budgetDay = 0, budgetMonth = 0, expensesMonth = 0) {
        this.income = income;
        this.incomeMonth = incomeMonth;
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses;
        this.deposit = deposit;
        this.precentDeposit = precentDeposit;
        this.moneyDeposit = moneyDeposit;
        this.mission = mission;
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
    }
    start() {
        start.disabled = true;
        start.style.display = 'none';
        cansel.style.display = 'block';
        let leftInputs = document.querySelectorAll('.data input[type=text]');
        for (let i = 0; i < leftInputs.length; i++) {
            let elem = leftInputs[i];
            elem.disabled = true;
        }
        //Блокирую галочку депозита
        if (checkBox.checked === true) {
            checkBox.disabled = true;
        }
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getIncomeMonth();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
    }
    blockStart() {
        start.disabled = salaryAmount.value.trim() === '';
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncomValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }
    getAddIncome() {
        additionalIncome.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    }
    addExpensesBlock() {
        let expensesItems = document.querySelectorAll('.expenses-items');
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses() {
        let expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);

    }
    addIncomeBlock() {
        let incomeItems = document.querySelectorAll('.income-items');
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getIncome() {
        const incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-titles').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        }, this);

    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth <= 0 || missionMonth === Infinity) {
            return 'Цель не будет достигнута';
        } else {
            return missionMonth;
        }
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода!';
        }
        if (this.budgetDay >= 600 || this.budgetDay < 1200) {
            return 'У вас средний уровень дохода';

        }
        if (this.budgetDay < 600 && this.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';

        }
        if (this.budgetDay <= 0) {
            return 'Что-то пошло не так';
        }
    }
    getInfoDeposit() {
        do {
            this.precentDeposit = prompt('Какой годовой процент ?', '10');
        } while (!isNumber(this.precentDeposit));
        do {
            this.moneyDeposit = prompt('Кака сумма заложена ?', 10000);
        } while (!isNumber(this.moneyDeposit));
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;

    }
    positionInputPeriod() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();
    }
    reset() {
        //Убираю кноку рассчета
        cansel.style.display = 'none';
        //Перебираю импуты слева, чтобы заблочить их 
        start.style.display = 'block';
        //Обнуляю значения всех импутов
        for (let i = 0; i < allInputs.length; i++) {
            let elem = allInputs[i];
            elem.value = '';
        }
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.mission = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        console.log(this);
        //Удаляю созданные поля
        let incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }
        let expensesItems = document.querySelectorAll('.expenses-items');
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
        }
        //Разблокирую поля левых импутов
        for (let i = 0; i < leftInputs.length; i++) {
            let elem = leftInputs[i];
            elem.disabled = false;
        }
        periodSelect.value = '1';
        periodAmount.textContent = periodSelect.value;
        if (incomePlus.style.display === 'none') {
            incomePlus.style.display = 'block';
        }
        if (expensesPlus.style.display === 'none') {
            expensesPlus.style.display = 'block';
        }
        if (checkBox.checked === true) {
            checkBox.checked = false;
            checkBox.disabled = false;
        }
    }
    eventsListeners() {
        salaryAmount.addEventListener('input', this.blockStart.bind(this));
        start.addEventListener('click', this.start.bind(this));
        cansel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.positionInputPeriod.bind(this));
    }


}
const appData = new AppData();
appData.eventsListeners();
console.log(appData);
/*let addExpenses = ['привет', 'мир'];
let a = [];
for(let i = 0; i < addExpenses.length; i++ ) {
    addExpenses[i] = addExpenses[i][0].toUpperCase() + addExpenses[i].substring(1);
    a.push(addExpenses[i]);
}*/