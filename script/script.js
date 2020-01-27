'use strict';
//Объявление переменных для дальнейшей работы 
//Первый пункт основго задания
let money = 25000,
    income = 'фриланс',
    addExpenses = 'интернет, коммуналка, корм для котов, еда',
    deposit = true,
    mission = 50000,
    period = 6,
    budgetDay = money / 30,
    expenses1,
    expenses2,
    amout1,
    amout2,
    budgetMounth;
//Второй пункт основго задания
/*console.log(typeof money );
console.log(typeof income );
console.log(typeof addExpenses );
console.log(addExpenses.length );
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать '+ mission + 'рублей' );
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(','));
console.log(budgetDay);*/

money = +prompt('Ваш месячный доход ?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
addExpenses = addExpenses.split(',');
deposit = confirm('Есть ли у вас депозит ?');
expenses1 = prompt('Введите обязательную статью расходов');
expenses2 = prompt('Введите обязательную статью расходов');
amout1 = +prompt('Во сколько это обойдется ?');
amout2 = +prompt('Во сколько это обойдется ?');
console.log(addExpenses);
budgetDay = (money - (amout1 + amout2)) / 30;
budgetDay = Math.floor(budgetDay);
budgetMounth = (budgetDay * 30);
console.log('Бюджет на месяц '+ budgetMounth); 
mission = mission / budgetMounth;
budgetDay = budgetMounth / 30;
budgetDay = Math.floor(budgetDay);
mission = Math.ceil(mission);
console.log('Цель будет достигнута ' + mission);
console.log('Бюджет на день ' + budgetDay);

if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода!');
} if (budgetDay >= 600 && budgetDay < 1200  ) {
    alert('У вас средний уровень дохода');
} if (budgetDay < 600) {
    alert('К сожалению у вас уровень дохода ниже среднего');
} if (budgetDay < 0) {
    alert('Что-то пошло не так');
}



