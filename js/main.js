"use strict";

let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');



let money,time;

startBtn.addEventListener('click', () => {
     time = prompt('Введите дату в формате YYYY-MM-DD', '');
     money = +prompt("Ваш бюджет на месяц?", '');
 
     while (isNaN(money) || money == '' || money == null) {
         money = prompt("Ваш бюджет?", "");
     }
     appData.budget = money;
     appData.timeData = time;
     budgetValue.textContent = money.toFixed();
     yearValue.value = new Date(Date.parse(time)).getFullYear();
     monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
     dayValue.value = new Date(Date.parse(time)).getDate();

 });

 expensesBtn.addEventListener('click', () => {
     let sum = 0;
     for (let i = 0; i < expensesItem.length; i++) {
         let a = expensesItem[i].value,
             b = expensesItem[++i].value;
 
         if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
             appData.expenses[a] = b;
             sum += +b;
         } else {
             i = i - 1;
         }
         expensesValue.textContent = sum;
     }
 });

 optionalExpensesBtn.addEventListener('click', function() {
     for (let i = 0;i < optionalExpensesItem.length;i++){
          let opt = optionalExpensesItem[i].value;
          appData.optionalExpenses[i] = opt;
          optionalExpensesValue.textContent += appData.optionalExpenses[i]+ ' ';
     }
 });

 countBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget/30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay<100) {
            levelValue.textContent = "Маленький уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay<2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay>2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Ошибка";
        }
    } else {
        dayBudgetValue.textContent = "Ошибка";
    }
 });

 incomeItem.addEventListener('input', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
 });

 checkSavings.addEventListener('click', function() {
     if (appData.saving == false) {
        appData.saving = true;
     } else {
        appData.saving = false; 
     }
 });

 sumValue.addEventListener('input', function() {
     if (appData.saving == true) {
        let sum = +sumValue.value,
            procent = percentValue.value;
        appData.monthIncome = sum/100/12*procent;    
        appData.yearIncome = sum/100*procent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
     }
 });

 percentValue.addEventListener('input', function() {
    if (appData.saving == true) {
        if (appData.saving == true) {
            let sum = +sumValue.value,
                procent = percentValue.value;
            appData.monthIncome = sum/100/12*procent;    
            appData.yearIncome = sum/100*procent;
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
         }
    }
 })

let appData = {
    budgetData : money,
    expenses:{},
    timeData : time,
    optionalExpenses : {},
    income : [],
    saving : false,
     detectLevel: function() {
          

          if (appData.moneyPerDay<100) {
               console.log("Маленький уровень достатка");
           } else if (appData.moneyPerDay > 100 && appData.moneyPerDay<2000) {
               console.log("Средний уровень достатка");
           } else if (appData.moneyPerDay>2000) {
               console.log("Высокий уровень достатка");
           } else {
                console.log("Ошибка");
           }
     },
     checkSavings : function() {
          if (appData.saving==true) {
               let save = +prompt("Какова сумма накоплений","");
               let procent = +prompt("Какой проценит","");
               
               alert("Доход в месц с дипозита" + appData.monthIncome);
          }
     },
     chooseIncome : function() {
          
          for (let i=0;i<1;i++){
               let items = prompt ("Что принесет доп доход (через запятую)","");
               if (typeof(items)==='string' && items!="" && items!=null){
                    appData.income = items.split(', ');
                    appData.income.push(prompt("Что-тог еще"));
                    appData.income.sort();
               } else {
                    i = i-1;
               }
          }

          appData.income.forEach(function(items,i) {
               console.log(i+" Способы доп. заработка: " + items+".");
          })          
     }
};

for (let i in appData) {
     console.log("Наша программа включает в себя данные:" + i);
}

