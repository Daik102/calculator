const title = document.querySelector('.title');
const displayContainer = document.querySelector('.display-container');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const backSpace = document.querySelector('.back-space');
const allClear = document.querySelector('.all-clear');
const footer = document.querySelector('.footer');
const factor = 10000;
let firstNum = '';
let operator = '';
let secondNum = '';
let result = '';
let onSecondNum;
let freezed;
let matrix;
let hello;

function handleLargeDigits(result) {
  if ((result) >= 1000000000000) {
    freezed = true;
    return 'Over trillion!';
  }
  if ((result) <= -1000000000000) {
    freezed = true;
    return 'Under trillion!';
  }
  if (result.includes('-')) {
    if (result.length >= 14) {
      result = result.slice(0, 13);
      if (result.slice(-1) === '.') {
        result = result.slice(0, 12);
      }
    }
  } else if (result.length >= 13) {
    result = result.slice(0, 12);
    if (result.slice(-1) === '.') {
      result = result.slice(0, 11);
    }
  }
  return result;
}

function operate() {
  if (operator === '/' && secondNum === '0') {
    matrix = true;
    freezed = true;
    document.body.classList.add('white-world');
    displayContainer.classList.add('matrix-display');
    display.classList.add('small-font');
    display.textContent = 'Welcome to the Matrix';
    buttons.forEach(button => {
      button.classList.add('white-world');
    });
    allClear.classList.remove('white-world');
    allClear.textContent = 'Red';
    backSpace.classList.add('blue-pill');
    backSpace.textContent = 'Blue';
    title.style.visibility = 'hidden';
    footer.style.visibility = 'hidden';
    return;
  }
  if (operator === '+') {
    result = ((Number(firstNum) * factor + Number(secondNum) * factor) / factor).toString();
  } else if (operator === '-') {
    result = ((firstNum * factor - secondNum * factor) / factor).toString();
  } else if (operator === '*') {
    result = (((firstNum * factor) * (secondNum * factor)) / (factor * factor)).toString();
  } else if (operator === '/') {
    result = (((firstNum * factor) / (secondNum * factor))).toString();
  }
  result = handleLargeDigits(result);
  firstNum = result;
  operator = '';
  secondNum = '';
  onSecondNum = false;
  display.textContent = firstNum;
}

function doAllClear() {
  if (matrix) {
    matrix = false;
    document.body.classList.remove('white-world');
    displayContainer.classList.remove('matrix-display');
    display.classList.remove('small-font');
    buttons.forEach(button => {
      button.classList.remove('white-world');
    });
    allClear.textContent = 'AC';
    backSpace.classList.remove('blue-pill');
    backSpace.textContent = 'BS';
    title.style.visibility = 'visible';
    footer.style.visibility = 'visible';
  }
  firstNum = '';
  operator = '';
  secondNum = '';
  result = '';
  onSecondNum = false;
  freezed = false;
  display.textContent = '0';
}

function doBackSpace() {
  if (firstNum === '' && !operator) {
    return;
  }
  if (firstNum === result && !operator) {
    firstNum = '';
    display.textContent = '0';
    return;
  }
  if (operator && secondNum === '') {
    operator = '';
    onSecondNum = false;
  }
  if (!onSecondNum) {
    if (firstNum.length === 1) {
      firstNum = '';
      display.textContent = '0';
    } else {
      firstNum = firstNum.slice(0, firstNum.length -1);
      display.textContent = firstNum;
    }
  } else {
    if (secondNum.length === 1) {
      secondNum = ''
      display.textContent = '0';
    } else {
      secondNum = secondNum.slice(0, secondNum.length -1);
      display.textContent = secondNum;
    }
  }
}

function handleDecimal() {
  if (!onSecondNum) {
    if (firstNum === '' || firstNum === result && !operator) {
      firstNum = '0';
    }
    if (firstNum.includes('.')) {
      return;
    }
    firstNum += '.';
    display.textContent = firstNum;
  } else {
    if (secondNum === '') {
      secondNum = '0';
    }
    if (secondNum.includes('.')) {
      return;
    }
    secondNum += '.';
    display.textContent = secondNum;
  }
}

title.addEventListener('click', () => {
  if (matrix) {
    return;
  }
  if (hello) {
    if (secondNum !== '') {
      display.textContent = secondNum;
    } else if (firstNum !== '') {
      display.textContent = firstNum;
    } else {
      display.textContent = '0';
    }
    hello = false;
    return;
  }
  hello = true;
  display.textContent = 'Hello';
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.className.includes('all-clear')) {
      doAllClear();
      return;
    }
    if (freezed) {
      return;
    }
    if (button.className.includes('back-space')) {
      doBackSpace();
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
      handleDecimal();
    }
    if (button.className.includes('operator')) {
      if (firstNum === '') {
        return;
      }
      if (secondNum) {
        operate();
      }
      if (button.className.includes('divide')) {
        operator = '/';
      } else if (button.className.includes('multiply')) {
        operator = '*';
      } else if (button.className.includes('subtract')) {
        operator = '-';
      } else if (button.className.includes('add')) {
        operator = '+';
      }
      onSecondNum = true;
    }
    if (button.className.includes('equals')) {
      if (firstNum && secondNum) {
        operate();
      }
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Delete') {
    doAllClear();
    return;
  }
  if (freezed) {
    return;
  }
  if (e.key === 'Backspace') {
    doBackSpace();
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
    handleDecimal();
  }

  const operatorSymbols = '+-*/';

  if (operatorSymbols.includes(e.key)) {
    if (firstNum === '') {
      return;
    }
    if (secondNum) {
      operate();
    }
    operator = e.key;
    onSecondNum = true;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
  }
  if (e.key === '=' || e.key === 'Enter') {
    if (firstNum && secondNum) {
      operate();
    }
  }
});