//Объявление переменных для дальнейшей работы 
//Первый пункт основго задания
let money = 25000,
    income = 'фриланс',
    addExpenses = 'ИнтеРнет, комМуналка, корм для котов, еда',
    deposit = true,
    mission = 50000,
    period = 6,
    budgetDay = money / 30;
//Второй пункт основго задания
console.log(typeof money );
console.log(typeof income );
console.log(typeof addExpenses );
console.log(addExpenses.length );
//Объеденил строки 
console.log('Период равен ' + period + ' месяцев ' + 'Цель заработать '+ mission + 'рублей');
console.log(budgetDay);
//Технически работает, но я думаю, что можно как-то записать короче, но не придумал как.
addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');
console.log(addExpenses);



