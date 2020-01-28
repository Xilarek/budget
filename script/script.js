'use strict';
//Объявление переменных для дальнейшей работы 
//Первый пункт основго задания
let money = +prompt('Ваш месячный доход ?'),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит ?'),
    mission = 50000,
    period = 6,
    expenses1 = prompt('Введите обязательную статью расходов'),
    amout1 = +prompt('Во сколько это обойдется ?'),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amout2 = +prompt('Во сколько это обойдется ?');
    
addExpenses = addExpenses.split(',');

//Функция суммый обязательных  расходов за месяц 
const getExpensesMonth = function(amout1, amout2) {
     return amout1 + amout2;
 };
    let costs = getExpensesMonth(amout1, amout2);
    console.log('costs:', costs );

//Функция расчета накоплений за месяц 
 const getAccumulatedMonth = function(money, costs) {
     return money - costs;
 };
    let accumulation = getAccumulatedMonth(money, costs);
    let budgetDay = accumulation / 30;
    budgetDay = Math.floor(accumulation / 30);

 let accumulatedMonth = accumulation;
    console.log('accumulation:', accumulation );

//Функция расчета достижения цели 
 const getTargetMonth = function(mission, accumulatedMonth) {
     let missionMonth =  mission / accumulatedMonth;
     return Math.ceil(missionMonth);
 };
 let missionMonth = getTargetMonth(mission, accumulatedMonth);
 console.log('missionMonth:', missionMonth);

const getStatusIncome = function (budgetDay) {
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода!');
} if (budgetDay >= 600 && budgetDay < 1200  ) {
    return console.log('У вас средний уровень дохода');
    
} if (budgetDay < 600 && budgetDay > 0 ) {
    return console.log('К сожалению у вас уровень дохода ниже среднего');
    
} if (budgetDay <= 0) {
    return console.log('Что-то пошло не так');
}
}; 
let getStatus = getStatusIncome(budgetDay);
console.log('месячный доход '+ money);
console.log(addExpenses);
console.log('Обязательные расходы '+costs);
console.log('Период равен ' + period + ' месяцев');
console.log('Бюджет на день ' + budgetDay);
console.log('Цель заработать '+ mission + 'рублей' );
console.log('Цель будет достигнута ' + missionMonth);
console.log(typeof money);
console.log(typeof income);
console.log(typeof addExpenses);
