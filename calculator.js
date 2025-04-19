const display = document.querySelector('.display');

let firstNum = 3;
let operator = '/';
let secondeNum = 8;
let result;



function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate() {
  if (operator === '+') {
    result = add(firstNum, secondeNum);
  } else if (operator === '-') {
    result = subtract(firstNum, secondeNum);
  } else if (operator === '*') {
    result = multiply(firstNum, secondeNum);
  } else if (operator === '/') {
    result = divide(firstNum, secondeNum)
  }
  return result;
}


console.log(operate());