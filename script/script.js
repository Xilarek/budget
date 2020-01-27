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
    expenses2 = prompt('Введите обязательную статью расходов'),
    amout1 = +prompt('Во сколько это обойдется ?'),
    amout2 = +prompt('Во сколько это обойдется ?'),
    budgetDay = (money - (amout1 + amout2)) / 30,
    budgetMounth = money - (amout1 + amout2 );

addExpenses = addExpenses.split(',');

budgetDay = Math.floor(budgetMounth / 30);

const missionMonth = Math.ceil(mission / budgetMounth);

if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода!');
} if (budgetDay >= 600 && budgetDay < 1200  ) {
    alert('У вас средний уровень дохода');
} if (budgetDay < 600 && budgetDay > 0 ) {
    alert('К сожалению у вас уровень дохода ниже среднего');
} if (budgetDay < 0) {
    alert('Что-то пошло не так');
}

console.log(typeof money );
console.log(typeof income );
console.log(typeof addExpenses );
console.log(addExpenses.length );
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать '+ mission + 'рублей' );
console.log(budgetDay);
console.log(addExpenses);
console.log('Бюджет на месяц '+ budgetMounth); 
console.log('Цель будет достигнута ' + missionMonth);
console.log('Бюджет на день ' + budgetDay);

