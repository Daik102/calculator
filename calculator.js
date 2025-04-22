const displayContainer = document.querySelector('.display-container');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const allClear = document.querySelector('.all-clear');
const backSpace = document.querySelector('.back-space');
const factor = 10000;
let firstNum = '';
let operator = '';
let secondNum = '';
let result = '';
let onSecondNum;
let freezed;
let matrix;

function add(a, b) {
  const sum = ((Number(a) * factor + Number(b) * factor) / factor).toString();
  if ((sum) >= 1000000000000) {
    freezed = true;
    return 'Over trillion!';
  } 
  if (sum.length >= 13) {
    const twelveDigit = sum.slice(0, 12);
    if (twelveDigit.slice(-1) === '.') {
      return twelveDigit.slice(0, 11);
    } else {
      return twelveDigit;
    }
  } else {
    return sum;
  }
}

function subtract(a, b) {
  const difference = ((a * factor - b * factor) / factor).toString();
  if ((difference) <= -1000000000000) {
    freezed = true;
    return 'Under trillion!';
  }
  if (difference.length >= 14) {
    const thirteenDigit = difference.slice(0, 13);
    if (thirteenDigit.slice(-1) === '.') {
      return thirteenDigit.slice(0, 12);
    } else {
      return thirteenDigit;
    }
  } else {
    return difference;
  }
}

function multiply(a, b) {
  const product = (((a * factor) * (b * factor)) / (factor * factor)).toString();
  if ((product) >= 1000000000000) {
    freezed = true;
    return 'Over trillion!';
  } 
  if ((product) <= -1000000000000) {
    freezed = true;
    return 'Under trillion!';
  }
  if (product.includes('-') && product.length >= 14) {
    const thirteenDigit = product.slice(0, 13);
    if (thirteenDigit.slice(-1) === '.') {
      return thirteenDigit.slice(0, 12);
    } else {
      return thirteenDigit;
    }
  } else if (product.length >= 13) {
    const twelveDigit = product.slice(0, 12);
    if (twelveDigit.slice(-1) === '.') {
      return twelveDigit.slice(0, 11);
    } else {
      return twelveDigit;
    }
  } else {
    return product;
  }
}

function divide(a, b) {
  const quotient = (((a * factor) / (b * factor))).toString();
  if ((quotient) >= 1000000000000) {
    freezed = true;
    return 'Over trillion!';
  } 
  if ((quotient) <= -1000000000000) {
    freezed = true;
    return 'Under trillion!';
  }
  if (quotient.includes('-') && quotient.length >= 14) {
    const thirteenDigit = quotient.slice(0, 13);
    if (thirteenDigit.slice(-1) === '.') {
      return thirteenDigit.slice(0, 12);
    } else {
      return thirteenDigit;
    }
  } else if (quotient.length >= 13) {
    const twelveDigit = quotient.slice(0, 12);
    if (twelveDigit.slice(-1) === '.') {
      return twelveDigit.slice(0, 11);
    } else {
      return twelveDigit;
    }
  } else {
    return quotient;
  }
}

function operate() {
  if (operator === '/' && secondNum === '0') {
    display.textContent = 'Welcome to the Matrix';
    matrix = true;
    freezed = true;
    document.body.classList.add('white-world');
    displayContainer.classList.add('white-display');
    display.classList.add('small-font');
    buttons.forEach(button => {
      button.classList.add('white-world');
    });
    allClear.classList.remove('white-world');
    allClear.textContent = 'Red';
    backSpace.classList.add('blue-pill');
    backSpace.textContent = 'Blue';
    return;
  }
  if (operator === '+') {
    result = add(firstNum, secondNum);
  } else if (operator === '-') {
    result = subtract(firstNum, secondNum);
  } else if (operator === '*') {
    result = multiply(firstNum, secondNum);
  } else if (operator === '/') {
    result = divide(firstNum, secondNum);
  }
  firstNum = result;
  operator = '';
  secondNum = '';
  onSecondNum = false;
  display.textContent = firstNum;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.className.includes('all-clear')) {
      if (matrix) {
        matrix = false;
        document.body.classList.remove('white-world');
        displayContainer.classList.remove('white-display');
        display.classList.remove('small-font');
        buttons.forEach(button => {
          button.classList.remove('white-world');
        });
        allClear.textContent = 'AC';
        backSpace.classList.remove('blue-pill');
        backSpace.textContent = 'BS';
      }
      firstNum = '';
      operator = '';
      secondNum = '';
      onSecondNum = false;
      freezed = false;
      display.textContent = '0';
      return;
    }
    if (freezed) {
      return;
    }
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
    if (button.className.includes('operator')) {
      if (firstNum === '') {
        return;
      }
      if (secondNum) {
        operate();
      }
      if (button.className.includes('multiply')) {
        operator = '*';
      } else if (button.className.includes('divide')) {
        operator = '/';
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
    if (matrix) {
      matrix = false;
      document.body.classList.remove('white-world');
      displayContainer.classList.remove('white-display');
      display.classList.remove('small-font');
      buttons.forEach(button => {
        button.classList.remove('white-world');
      });
      allClear.textContent = 'AC';
      backSpace.classList.remove('blue-pill');
      backSpace.textContent = 'BS';
    }
    firstNum = '';
    operator = '';
    secondNum = '';
    onSecondNum = false;
    freezed = false;
    display.textContent = '0';
    return;
  }
  if (freezed) {
    return;
  }
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