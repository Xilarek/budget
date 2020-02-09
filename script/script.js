'use strict';
let start = document.getElementById('start'),
    cansel = document.getElementById('cancel'),
    discharge = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    checkBox = document.getElementById('deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    accamulatedMonthValue = document.getElementsByTagName('accumulated_month-value')[0],
    additionalIncomValue = document.querySelector('.additional_income-value'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    itemIncome = document.querySelector('.income-titles'),
    cashIncome = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('[type="range"]'),
    leftInputs = document.querySelectorAll('.data input[type=text]'),
    allInputs = document.querySelectorAll('input'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    precentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.reset();

    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncomValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();


    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function () {
        additionalIncome.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    addExpensesBlock: function () {
        expensesItems = document.querySelectorAll('.expenses-items');
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);
    },
    addIncomeBlock: function () {
        incomeItems = document.querySelectorAll('.income-items');
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-titles').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        }, this);


        for (let key in appData.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    //Функция суммый обязательных  расходов за месяц 
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }

    },
    //Функция расчета накоплений за месяц 
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    //Функция расчета достижения цели 
    getTargetMonth: function () {
        let missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth <= 0 || missionMonth === Infinity) {
            return 'Цель не будет достигнута';
        } else {
            return missionMonth;
        }

    },
    //Функция статуса дохода
    getStatusIncome: function () {
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
    },
    getInfoDeposit: function () {
        do {
            this.precentDeposit = prompt('Какой годовой процент ?', '10');
        } while (!isNumber(this.precentDeposit));
        do {
            this.moneyDeposit = prompt('Кака сумма заложена ?', 10000);
        } while (!isNumber(this.moneyDeposit));
    },

    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;

    },
    positionInputPeriod: function () {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();

    },
    reset: function () {
        //Убираю кноку рассчета
        start.style.display = 'none';
        //Перебираю импуты слева, чтобы заблочить их 
        let leftInputs = document.querySelectorAll('.data input[type=text]');
        for (let i = 0; i < leftInputs.length; i++) {
            let elem = leftInputs[i];
            elem.disabled = true;
        }
        //Блокирую галочку депозита
        if (checkBox.checked === true) {
            checkBox.disabled = true;
        }
        //Добавляю кнопку сброса
        cansel.style.display = 'block';
        //Вешаю обработчик событий на снопку сброс
        cansel.addEventListener('click', function () {
            //Обнуляю значения всех импутов
            for (let i = 0; i < allInputs.length; i++) {
                let elem = allInputs[i];
                elem.value = '';
            }
                appData.income = {};
                appData.incomeMonth = 0;
                appData.addIncome = [];
                appData.expenses = {};
                appData.addExpenses = [];
                appData.deposit = false;
                appData.precentDeposit = 0;
                appData.moneyDeposit = 0;
                appData.mission = 0;
                appData.budget = 0;
                appData.budgetDay = 0;
                appData.budgetMonth = 0;
                appData.expensesMonth = 0;
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
            if (salaryAmount.value.trim() === '') {
                start.disabled = !salaryAmount.value.trim();
            }
            periodSelect.value = '1';
            periodAmount.textContent = periodSelect.value;
            if (incomePlus.style.display === 'none') {
                incomePlus.style.display = 'block';
            }
            if (expensesPlus.style.display === 'none') {
                expensesPlus.style.display = 'block';
            }
            if(checkBox.checked === true){
                checkBox.checked = false;
                checkBox.disabled = false; 
            }
            cansel.style.display = 'none';
            start.style.display = 'block';
        });
    }
};

const blockStart = function () {
        start.disabled = !salaryAmount.value.trim();

        };
        blockStart();

        /*let addExpenses = ['привет', 'мир'];
        let a = [];
        for(let i = 0; i < addExpenses.length; i++ ) {
            addExpenses[i] = addExpenses[i][0].toUpperCase() + addExpenses[i].substring(1);
            a.push(addExpenses[i]);
        }
        console.log(a.join(', '));*/
        salaryAmount.addEventListener('input', blockStart);
        start.addEventListener('click', appData.start.bind(appData));
        //cansel.addEventListener('click', appData.reset.bind(appData));
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.positionInputPeriod.bind(appData));

        let missionMonth = appData.getTargetMonth();
        let getStatus = appData.getStatusIncome();