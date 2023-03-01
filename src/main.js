//main file
let numButtons = document.querySelectorAll('.button-main');
let buttons = document.querySelectorAll('button');
let calculator = document.querySelector('.calculator');
let display = document.querySelector('.display');
let hasFirstNumber,
  hasSecondNumber,
  displayCleaned,
  hasSign,
  sign,
  secondNumber,
  firstNumber,
  firstNumberOfDots,
  secondNumberOfDots,
  setComma;
firstNumber = secondNumber = '';
firstNumberOfDots = secondNumberOfDots = 0;
let currentButton;

calculator.addEventListener('pointerdown', e => {
  var button = e.target;
  currentButton = button;
  if (!button.tagName == 'BUTTON') return;

  if (button.classList.contains('button-main')) {
    button.classList.add('button-main_active');

    if (
      Array.from(firstNumber).filter(elem => elem != '.').length +
        firstNumberOfDots ==
      11
    ) {
      hasFirstNumber = true;
    }
    if (
      Array.from(secondNumber).filter(elem => elem != '.').length +
        secondNumberOfDots ==
      11
    ) {
      hasSecondNumber = true;
    }
    if (!hasFirstNumber) {
      firstNumber += button.firstChild.data;
      firstNumberDisplayOutput();
    }
    if (!hasSecondNumber && hasFirstNumber && hasSign) {
      secondNumber += button.firstChild.data;
      secondNumberDisplayOutput(button);
    }
  } else if (button.classList.contains('button-right')) {
    button.classList.add('button-right_active');
    if (!hasFirstNumber) hasFirstNumber = true;
    setSign(button);
  } else if (button.classList.contains('button-up')) {
    button.classList.add('button-up_active');
  } else if (button.classList.contains('button-equal')) {
    button.classList.add('button-right_active');
    resultSum();
  }
});
document.addEventListener('pointerup', e => {
  currentButton.classList.remove('button-main_active');
  currentButton.classList.remove('button-up_active');
});

function firstNumberDisplayOutput() {
  console.log(firstNumber, 1);

  switch (firstNumber.length) {
    case 9:
      display.style.fontSize = '70px';
      break;
    case 10:
      display.style.fontSize = '65px';
      break;
    case 11:
      display.style.fontSize = '60px';
      break;
  }
  if (firstNumber.includes(',')) {
    if (!setComma) {
      setComma = true;
      firstNumberOfDots = 1;

      let index = firstNumber.indexOf(',') - 1;
      console.log(firstNumber[index]);
      if (firstNumber[index] == '.') {
        let rez = Array.from(firstNumber);
        rez.splice(index, 1);
        firstNumber = rez.join('');
      }

      display.innerHTML = firstNumber;

      return;
    }
  } else {
    display.innerHTML = firstNumber;
    if (firstNumber.length == 3 || firstNumber.length == 7) {
      firstNumber += '.';
      firstNumberOfDots++;
    }
    return;
  }
  display.innerHTML = firstNumber;
}
function secondNumberDisplayOutput() {
  console.log(secondNumber, 2);
  if (!displayCleaned) {
    display.innerHTML = '';
    displayCleaned = true;
  }
  for (const button of buttons) {
    button.classList.remove('button-right_active');
  }
  switch (secondNumber.length) {
    case 9:
      display.style.fontSize = '70px';
      break;
    case 10:
      display.style.fontSize = '65px';
      break;
    case 11:
      display.style.fontSize = '60px';
      break;
  }
  if (secondNumber.includes(',')) {
    if (!setComma) {
      setComma = true;
      secondNumberOfDots = 1;

      let index = secondNumber.indexOf(',') - 1;
      console.log(secondNumber[index]);
      if (secondNumber[index] == '.') {
        let rez = Array.from(secondNumber);
        rez.splice(index, 1);
        secondNumber = rez.join('');
      }

      display.innerHTML = secondNumber;

      return;
    }
  } else {
    display.innerHTML = secondNumber;
    if (secondNumber.length == 3 || secondNumber.length == 7) {
      secondNumber += '.';
      secondNumberOfDots++;
    }
    return;
  }
  display.innerHTML = firstNumber;
}
function setSign(button) {
  switch (button.firstChild.data) {
    case '÷':
      sign = '/';
      hasSign = true;
      break;
    case '×':
      sign = '*';
      hasSign = true;
      break;
    default:
      sign = button.firstChild.data;
      hasSign = true;
  }
}
function resultSum() {
  display.innerHTML = '';
  let result = 0;
  let firstOperand = +Array.from(firstNumber)
    .filter(elem => elem != '.')
    .join('');
  let secondOperand = +Array.from(secondNumber)
    .filter(elem => elem != '.')
    .join('');
  switch (sign) {
    case '/':
      result = firstOperand / secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '+':
      result = firstOperand + secondOperand;
      break;
  }
  if (result > 11) {
    result = result.toExponential(2);
  }
  display.innerHTML = result;
}
