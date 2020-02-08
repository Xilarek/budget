'use strict';
let start = document.getElementById('start'),
    discharge = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    checkBox = document.getElementById('checkmark'),
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
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');
    

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
 console.log(periodSelect);
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
        
        
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncomValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        

    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncome.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function() {
        expensesItems = document.querySelectorAll('.expenses-items');
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== ''  && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
        });
    },
    addIncomeBlock: function () {
         incomeItems = document.querySelectorAll('.income-items');
         let cloneIncomeItem = incomeItems[0].cloneNode(true);
         incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
         incomeItems = document.querySelectorAll('.income-items');

         incomeItems = document.querySelectorAll('.income-items');
         if(incomeItems.length === 3) {
            incomePlus.style.display ='none';
         }
    },
    getIncome: function () {
        incomeItems.forEach(function(item){
             let itemIncome = item.querySelector('.income-titles').value;
             let cashIncome = item.querySelector('.income-amount').value;
             if(itemIncome !== '' && cashIncome !== '') {
                 appData.income[itemIncome] =+ cashIncome;
            }
         });
    

        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
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
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    //Функция расчета достижения цели 
    getTargetMonth: function () {
        let missionMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
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

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
        
    },
    positionInputPeriod: function () {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod().bind(appData);
    }

};
const blockStart = function () {
        start.disabled = !salaryAmount.value.trim() ? true : false;
    
};
blockStart();
console.log(salaryAmount.value.trim());

 

 




/*let addExpenses = ['привет', 'мир'];
let a = [];
for(let i = 0; i < addExpenses.length; i++ ) {
    addExpenses[i] = addExpenses[i][0].toUpperCase() + addExpenses[i].substring(1);
    a.push(addExpenses[i]);
}
console.log(a.join(', '));*/
salaryAmount.addEventListener('input', blockStart );
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input',appData.start);
console.dir(start);


let missionMonth = appData.getTargetMonth();



let getStatus = appData.getStatusIncome();
console.log(appData);








