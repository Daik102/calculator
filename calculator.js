const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let firstNum = '';
let operator = '';
let secondNum = '';
let onSecondNum;
let freezed;
let result;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.className.includes('back-space')) {
      if (firstNum === '' && !operator) {
        return;
      }
      if (firstNum === result && !operator) {
        firstNum = '0';
        display.textContent = firstNum;
        return;
      }
      if (operator && secondNum === '') {
        operator = '';
        onSecondNum = false;
      }
      if (!onSecondNum) {
        if (typeof(firstNum) === 'number') {
          firstNum = firstNum.toString();
        }
        if (firstNum.length === 1) {
          firstNum = '0';
        } else {
          firstNum = firstNum.slice(0, firstNum.length -1);
        }
        display.textContent = firstNum;
      } else {
        if (secondNum.length === 1) {
          secondNum = '0';
        } else {
          secondNum = secondNum.slice(0, secondNum.length -1);
        }
        display.textContent = secondNum;
      }
    }
    if (button.className.includes('all-clear')) {
      firstNum = '';
      operator = '';
      secondNum = '';
      display.textContent = '0';
      onSecondNum = false;
      freezed = false;
      return;
    }
    if (freezed) {
      return;
    }
    if (button.className.includes('number')) {
      if (!onSecondNum) {
        if (firstNum === result && !operator) {
          firstNum = '';
        }
        if (firstNum === '0') {
          if (button.className.includes('zero')) {
            return;
          }
          firstNum = button.textContent;
        } else {
          if (firstNum.length >= 12) {
            return;
          }
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
          if (secondNum.length >= 12) {
            return;
          }
          secondNum += button.textContent;
        }
        display.textContent = secondNum;
      }
    }
    if (button.className.includes('decimal')) {
      if (firstNum === '' || firstNum === result && !operator) {
        firstNum = '0';
      }
      if (!onSecondNum) {
        firstNum += '.';
        display.textContent = firstNum;
      } else {
        secondNum += '.';
        display.textContent = secondNum;
      }
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
    }
    if (button.className.includes('equals')) {
      if (firstNum && operator && secondNum || firstNum === 0 && operator && secondNum) {
        displayOperation();
      }
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
  display.textContent = firstNum;
  onSecondNum = false;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    if (firstNum === '' && !operator) {
      display.textContent = '0';
      return;
    }
    if (firstNum === result && !operator) {
      firstNum = '0';
      display.textContent = firstNum;
      return;
    }
    if (operator && secondNum === '') {
      operator = '';
      onSecondNum = false;
    }
    if (!onSecondNum) {
      if (typeof(firstNum) === 'number') {
        firstNum = firstNum.toString();
      }
      if (firstNum.length === 1) {
        firstNum = '0';
      } else {
        firstNum = firstNum.slice(0, firstNum.length -1);
      }
      display.textContent = firstNum;
    } else {
      if (secondNum.length === 1) {
        secondNum = '0';
      } else {
        secondNum = secondNum.slice(0, secondNum.length -1);
      }
      display.textContent = secondNum;
    }
  }
  if (e.key === 'Delete') {
    firstNum = '';
    operator = '';
    secondNum = '';
    display.textContent = '0';
    onSecondNum = false;
    freezed = false;
    return;
  }
  if (freezed) {
    return;
  }

  const numberKeys = '0123456789';

  if (numberKeys.includes(e.key)) {
    if (!onSecondNum) {
      if (firstNum === result && !operator) {
        firstNum = '';
      }
      if (firstNum === '0') {
        if (e.key === '0') {
          return;
        }
        firstNum = e.key;
      } else {
        if (firstNum.length >= 12) {
          return;
        }
        firstNum += e.key;
      }
      display.textContent = firstNum;
    } else {
      if (secondNum === '0') {
        if (e.key === '0') {
          return;
        }
        secondNum = e.key;
      } else {
        if (secondNum.length >= 12) {
          return;
        }
        secondNum += e.key;
      }
      display.textContent = secondNum;
    }
  }
  if (e.key === '.') {
    if (firstNum === '' || firstNum === result && !operator) {
      firstNum = '0';
    }
    if (!onSecondNum) {
      firstNum += '.';
      display.textContent = firstNum;
    } else {
      secondNum += '.';
      display.textContent = secondNum;
    }
  }

  const operatorSymbols = '+-*/';

  if (operatorSymbols.includes(e.key)) {
    if (firstNum === '') {
      return;
    }

    if (secondNum) {
      displayOperation();
    }
    onSecondNum = true;
    operator = e.key;
  }
  if (e.key === '=' || e.key === 'Enter') {
    if (firstNum && operator && secondNum || firstNum === 0 && operator && secondNum) {
      displayOperation();
      console.log(result);
    }
  }
});