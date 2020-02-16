'use strict';
const start = document.getElementById('start'),
    cansel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.getElementById('deposit-check'),
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
    periodSelect = document.querySelector('[type="range"]'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),
    accamulatedMonthValue = document.getElementsByTagName('accumulated_month-value')[0],
    leftInputs = document.querySelectorAll('.data input[type=text]'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    allInputs = document.querySelectorAll('input'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = 0;
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 0;
        this.budget = false;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
    isNumber(n) {
        return (!isNaN(parseFloat(n)) && isFinite(n));
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
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
        depositBank.disabled = true;

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getIncomeMonth();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
    }
    blockStart() {
        start.disabled = salaryAmount.value.trim() === '';
    }
    blockButton() {
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
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
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncome.forEach((item) => {
            item = item.value.trim();
            if (item !== '') {
                this.addIncome.push(item);
            }
        });
    }
    addExpensesBlock() {
        expensesItems = document.querySelectorAll('.expenses-items');
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });

    }
    addIncomeBlock() {
        incomeItems = document.querySelectorAll('.income-items');
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');


        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getIncome() {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-titles').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });

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
        const monthDeposit = this.moneyDeposit * (this.precentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

        //Удаляю созданные поля
        incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }
        expensesItems = document.querySelectorAll('.expenses-items');
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
        depositCheck.checked = false;
        this.depositHandler();
        depositBank.disabled = false;


        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        
        Object.assign(this, new AppData());

    }
    getInfoDeposit() {
        if (this.deposit) {
            this.precentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    valuePercentDeposit = () => {
        if (!this.isNumber(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value > 100) {
            alert('Ошибка введите корректные данные');
            depositPercent.value = '';
            start.disabled = true;
        } else {
            start.disabled = false;
        }
    }
    changePercent() {
        const valueSelect = depositBank.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('input', this.valuePercentDeposit);

        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
            depositPercent.removeEventListener('input', this.valuePercentDeposit);

        }

    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent.bind(this));
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventsListeners() {
        salaryAmount.addEventListener('input', this.blockStart.bind(this));
        start.addEventListener('click', this.start.bind(this));
        cansel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.positionInputPeriod.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }


}
const appData = new AppData();
appData.eventsListeners();
/*let addExpenses = ['привет', 'мир'];
let a = [];
for(let i = 0; i < addExpenses.length; i++ ) {
    addExpenses[i] = addExpenses[i][0].toUpperCase() + addExpenses[i].substring(1);
    a.push(addExpenses[i]);
}*/