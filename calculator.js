function doAllClear() {
  if (document.body.classList.contains('white-world')) {
    document.body.classList.remove('white-world');
    displayContainer.classList.remove('matrix-display');
    display.classList.remove('small-font')
    buttons.forEach((button) => button.classList.remove('white-world'));
    allClear.classList.remove('red-pill');
    allClear.textContent = 'AC';
    backSpace.classList.remove('blue-pill');
    backSpace.textContent = 'BS';
    title.classList.remove('hidden');
    linkContainer.classList.remove('hidden');
  }

  firstNum = '0';
  operator = '';
  secondNum = '';
  result = '';
  display.textContent = firstNum;
}

function doBackSpace() {
  if (document.body.classList.contains('white-world')) {
    display.textContent = 'Are you serious?';

    setTimeout(() => {
      if (document.body.classList.contains('white-world')) {
        display.textContent = 'Welcome to the Matrix';
      }
    }, 1500);

    return;
  }

  if (!operator) {
    if (result || firstNum.length === 1) {
      firstNum = '0';
      result = '';
    } else {
      firstNum = firstNum.slice(0, firstNum.length - 1);
    }

    display.textContent = firstNum;
  } else {
    if (!secondNum) {
      operator = '';
    } else {
      secondNum = secondNum.slice(0, secondNum.length - 1);

      if (!secondNum) {
        display.textContent = firstNum;
      } else {
        display.textContent = secondNum;
      }
    }
  }
}

function handleDecimal() {
  if (!operator) {
    if (firstNum.includes('.')) {
      return;
    }

    if (result) {
      firstNum = '0';
      result = '';
    }

    firstNum += '.';
    display.textContent = firstNum;
  } else {
    if (secondNum.includes('.')) {
      return;
    }

    if (!secondNum) {
      secondNum = '0';
    }

    secondNum += '.';
    display.textContent = secondNum;
  }
}

function handleLargeDigits() {
  if (result >= 1000000000000) {
    result = 'Over trillion!';
    return;
  } else if (result <= -1000000000000) {
    result = 'Under trillion!';
    return;
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
}

function operate() {
  if (operator === '/' && secondNum === '0') {
    document.body.classList.add('white-world');
    displayContainer.classList.add('matrix-display');
    display.classList.add('small-font');
    display.textContent = 'Welcome to the Matrix';
    buttons.forEach((button) => button.classList.add('white-world'));
    allClear.classList.add('red-pill');
    allClear.textContent = 'Red';
    backSpace.classList.add('blue-pill');
    backSpace.textContent = 'Blue';
    title.classList.add('hidden');
    linkContainer.classList.add('hidden');
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

  handleLargeDigits();
  firstNum = result;
  operator = '';
  secondNum = '';
  display.textContent = firstNum;
}

function handleClickEvent(e) {
  const button = e.target;
  
  if (button.classList.contains('all-clear')) {
    doAllClear();
  } else if (display.textContent === 'Over trillion!' || display.textContent === 'Under trillion!') {
    return;
  } else if (button.classList.contains('back-space')) {
    doBackSpace();
  } else if (document.body.classList.contains('white-world')) {
    return;
  } else if (button.classList.contains('number')) {
    if (!operator) {
      if (result) {
        firstNum = '0';
        result = '';
      }

      if (firstNum === '0') {
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
        secondNum = button.textContent;
      } else {
        if (secondNum.length >= 12) {
          return;
        }

        secondNum += button.textContent;
      }

      display.textContent = secondNum;
    }
  } else if (button.classList.contains('decimal')) {
    handleDecimal();
  } else if (button.classList.contains('operator')) {
    if (secondNum) {
      operate();
    }

    if (button.classList.contains('divide')) {
      operator = '/';
    } else if (button.classList.contains('multiply')) {
      operator = '*';
    } else if (button.classList.contains('subtract')) {
      operator = '-';
    } else if (button.classList.contains('add')) {
      operator = '+';
    }
  } else if (button.classList.contains('equals')) {
    if (secondNum) {
      operate();
    }
  }
}

function handleKeyboardEvent(e) {
  const numberKeys = '0123456789';
  const operatorSymbols = '+-*/';

  if (e.key === 'Delete') {
    doAllClear();
  } else if (display.textContent === 'Over trillion!' || display.textContent === 'Under trillion!') {
    return;
  } else if (e.key === 'Backspace') {
    doBackSpace();
  } else if (document.body.classList.contains('white-world')) {
    return;
  } else if (numberKeys.includes(e.key)) {
    if (!operator) {
      if (result) {
        firstNum = '0';
        result = '';
      }

      if (firstNum === '0') {
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
        secondNum = e.key;
      } else {
        if (secondNum.length >= 12) {
          return;
        }

        secondNum += e.key;
      }

      display.textContent = secondNum;
    }
  } else if (e.key === '.') {
    handleDecimal();
  } else if (operatorSymbols.includes(e.key)) {
    if (secondNum) {
      operate();
    }

    operator = e.key;
  } else if (e.key === '=' || e.key === 'Enter') {
    if (e.key === 'Enter') {
      e.preventDefault();
    }

    if (secondNum) {
      operate();
    }
  }
}

const title = document.querySelector('.title');
const displayContainer = document.querySelector('.display-container');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const backSpace = document.querySelector('.back-space');
const allClear = document.querySelector('.all-clear');
const linkContainer = document.querySelector('.link-container');
const factor = 10000;
let firstNum = '0';
let operator = '';
let secondNum = '';
let result = '';

setTimeout(() => {
  display.textContent = firstNum;
}, 1500);

buttons.forEach((button) => button.addEventListener('click', handleClickEvent));
document.addEventListener('keydown', handleKeyboardEvent);
