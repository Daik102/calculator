const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const one = document.querySelector('.one');

let firstNum = '';
let operator = '';
let secondNum = '';
let value = '';
let onSecondNum;
let freezed;
let result;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.className.includes('all-clear')) {
      firstNum = '';
      operator = '';
      secondNum = '';
      value = '';
      display.textContent = '';
      onSecondNum = false;
      freezed = false;
      return;
    }
    if (freezed) {
      return;
    }
    if (button.className.includes('number')) {
      if (!onSecondNum) {
        firstNum += button.textContent;
      } else {
        secondNum += button.textContent;
      }
    }
    if (button.className.includes('decimal')) {
      if (!onSecondNum) {
        firstNum += '.';
      } else {
        secondNum += '.';
      }
    }
    if (button.className.includes('operator')) {
      onSecondNum = true;
      if (button.className.includes('multiply')) {
        operator = '*';
      } else if (button.className.includes('divide')) {
        operator = '/';
      } else if (button.className.includes('subtract')) {
        operator = '-';
      } else if (button.className.includes('add')) {
        operator = '+';
      }
    }
    if (button.className.includes('equals')) {
      if (firstNum && operator && secondNum) {
        if (operator === '/' && secondNum === '0') {
          display.textContent = 'You can not divide by 0!';
          freezed = true;
          return;
        }
        operate();
        value += '=' + result;
        display.textContent = value;
        onSecondNum = false;
      } 
      return;
    }
    value += button.textContent;
    display.textContent = value;
  });
});

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return (a / b).toFixed(8);
}

function operate() {
  if (operator === '+') {
    result = add(firstNum, secondNum);
  } else if (operator === '-') {
    result = subtract(firstNum, secondNum);
  } else if (operator === '*') {
    result = multiply(firstNum, secondNum);
  } else if (operator === '/') {
    result = divide(firstNum, secondNum);
  }
}

