const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const one = document.querySelector('.one');

let firstNum = '';
let operator = '';
let secondNum = '';
let onSecondNum;
let freezed;
let result;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.className.includes('all-clear')) {
      firstNum = '';
      operator = '';
      secondNum = '';
      display.textContent = '';
      onSecondNum = false;
      freezed = false;
      display.textContent = '0';
      return;
    }
    if (freezed) {
      return;
    }
    if (button.className.includes('number')) {
      if (!onSecondNum) {
        if (firstNum === result) {
          firstNum = '';
        }
        if (firstNum === '0') {
          if (button.className.includes('zero')) {
            return;
          }
          firstNum = button.textContent;
        } else {
          firstNum += button.textContent;
        }
        display.textContent = firstNum;
      } else {
        if (secondNum === '0') {
          if (button.className.includes('zero')) {
            return;
          }
          secondNum = button.textContent;
        } else {
          secondNum += button.textContent;
        }
        if (operator === '*') {
          display.innerHTML = firstNum + '&#215;' + secondNum;
        } else if (operator === '/') {
          display.innerHTML = firstNum + '&#247;' + secondNum;
        } else {
          display.textContent = firstNum + operator + secondNum;
        }
      }
    }
    if (button.className.includes('decimal')) {
      if (!onSecondNum) {
        firstNum += '.';
      } else {
        secondNum += '.';
      }
      display.textContent += '.';
    }
    if (button.className.includes('operator')) {
      if (firstNum === '') {
        return;
      }

      if (secondNum) {
        displayOperation();
      }
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
      if (operator === '*') {
        display.innerHTML = firstNum + '&#215;';
      } else if (operator === '/') {
        display.innerHTML = firstNum + '&#247;';
      } else {
        display.textContent = firstNum + operator;
      }
    }
    if (button.className.includes('equals')) {
      if (firstNum && operator && secondNum || firstNum === 0 && operator && secondNum) {
        displayOperation();
      }
      return;
    }
  });
});

function add(a, b) {
  if ((Number(a) + Number(b)) >= 1000000000000) {
    freezed = true;
    return 'Over trillion!';
  } else {
    return Number(a) + Number(b); 
  }
}

function subtract(a, b) {
  if ((a - b) <= -1000000000000) {
    freezed = true;
    return 'Under trillion!';
  } else {
    return a - b;
  }
}

function multiply(a, b) {
  if ((a * b) >= 1000000000000) {
    freezed = true;
    return 'Over trillion!';
  } else if ((a * b) <= -1000000000000) {
    freezed = true;
    return 'Under trillion!';
  } {
    return a * b;
  }
}

function divide(a, b) {
  if (!Number.isInteger(a / b)) {
    const string = (a / b).toString().split('.');
    if (string[1].length >= 8) {
    return string[0] + '.' + string[1].slice(0, 8);
    }
  } 
  return a / b;
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

function displayOperation() {
  if (operator === '/' && secondNum === '0') {
    display.textContent = 'No kidding!';
    freezed = true;
    return;
  }
  operate();
  firstNum = result;
  operator = '';
  secondNum = '';
  display.textContent = result;
  onSecondNum = false;
}
