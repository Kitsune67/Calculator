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
  afterEqual,
  secondPercent,
  firstPercent,
  setMinus,
  setComma;
firstNumber = secondNumber = '';
firstNumberOfDots = secondNumberOfDots = minuslenght = 0;
let result = 0;
let currentButton;
let maxLenght = 11; //default max leght

calculator.addEventListener('pointerdown', e => {
  var button = e.target;
  currentButton = button;
  if (!button.tagName == 'BUTTON') return;

  if (button.classList.contains('button-main')) {
    button.classList.add('button-main_active');

    if (
      Array.from(firstNumber).filter(elem => elem != '.').length +
        firstNumberOfDots ==
      maxLenght
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
      if (afterEqual) {
        if (result != 0) {
          firstNumber = result.toString();
        }

        document
          .querySelector('.button-equal')
          .classList.remove('button-right_active');
      }
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
  if (button.classList.contains('button-plusminus')) {
    if (!hasSign) {
      let rez = [];
      if (!setMinus) {
        if (firstNumber.length >= 11) {
          display.style.fontSize = '55px';
          maxLenght = 12;
        }
        for (let i = 0; i < firstNumber.length + 1; i++) {
          if (i === 0) {
            rez.push('-');
            continue;
          }
          rez.push(firstNumber[i - 1]);
        }
        setMinus = true;
      } else {
        for (let i = 1; i < firstNumber.length; i++) {
          rez.push(firstNumber[i]);
        }
        setMinus = false;
        maxLenght = 11;
      }

      firstNumber = rez.join('');
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
      display.innerHTML = firstNumber;
    } else {
      let rez = [];
      if (!setMinus) {
        if (firstNumber.length >= 11) {
          display.style.fontSize = '55px';
          maxLenght = 12;
        }
        for (let i = 0; i < secondNumber.length + 1; i++) {
          if (i === 0) {
            rez.push('-');
            continue;
          }
          rez.push(secondNumber[i - 1]);
        }
        setMinus = true;
      } else {
        for (let i = 1; i < secondNumber.length; i++) {
          rez.push(firstNumber[i]);
        }
        setMinus = false;
        maxLenght = 11;
      }

      secondNumber = rez.join('');
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

      display.innerHTML = secondNumber;
    }
  } else if (button.classList.contains('button-percent')) {
    if (!hasSign) {
      if (!firstPercent) {
        firstNumber = Array.from(firstNumber).filter(elem => elem != '.');
        for (let i = 0; i < firstNumber.length; i++) {
          if (firstNumber[i] === ',') {
            firstNumber[i] = '.';
          }
        }
        firstNumber = +firstNumber.join('') / 100;
        firstPercent = true;
        firstNumber = firstNumber.toString();
      } else {
        firstNumber = +firstNumber / 100;
        firstNumber = firstNumber.toString();
      }
      if (firstNumber.length > 11) {
        firstNumber = Number(firstNumber).toFixed(6);
      }
      display.innerHTML = firstNumber;
    } else {
      if (!secondPercent) {
        secondNumber = Array.from(secondNumber).filter(elem => elem != '.');
        for (let i = 0; i < secondNumber.length; i++) {
          if (secondNumber[i] === ',') {
            secondNumber[i] = '.';
          }
        }
        secondNumber = +secondNumber.join('') / 100;
        secondPercent = true;
        secondNumber = secondNumber.toString();
      } else {
        secondNumber = +secondNumber / 100;
        secondNumber = secondNumber.toString();
      }
      if (firstNumber.length > 11) {
        firstNumber = +firstNumber.toFixed(1);
      } else if (secondNumber.length > 11) {
        secondNumber = +secondNumber.toFixed(1);
      }
      display.innerHTML = secondNumber;
    }
  }
  // console.log(firstNumber.length);
  if (firstNumber.length != 0) {
    document.querySelector('.button-clear').firstChild.data = 'C';
  }
});

document.addEventListener('pointerup', e => {
  currentButton.classList.remove('button-main_active');
  currentButton.classList.remove('button-up_active');
  if (currentButton.classList.contains('button-clear')) {
    document.querySelector('.button-clear').firstChild.data = 'AC';
    display.innerHTML = '';
    hasFirstNumber = hasSecondNumber = hasSign = setComma = false;
    firstNumberOfDots = secondNumberOfDots = 0;
    secondNumber = firstNumber = '';
    for (const button of buttons) {
      button.classList.remove('button-right_active');
    }
    sign = null;
    result = 0;
    firstPercent = secondPercent = false;
  }
});

function firstNumberDisplayOutput() {
  if (afterEqual) {
    result = 0;
    afterEqual = false;
  }
  // console.log(firstNumber, 1);

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

      if (firstNumber[index] == '.') {
        let rez = Array.from(firstNumber).filter(
          elem => elem != firstNumber[index]
        );

        firstNumber = rez.join('');
      }

      display.innerHTML = firstNumber;

      return;
    }
  } else {
    display.innerHTML = firstNumber;
    if (
      firstNumber.length == 3 ||
      (firstNumber.length == 7 && setMinus != true)
    ) {
      firstNumber += '.';
      firstNumberOfDots++;
    } else if (
      (setMinus == true && firstNumber.length == 4) ||
      firstNumber.length == 8
    ) {
      firstNumber += '.';
      firstNumberOfDots++;
    }
    if (
      firstNumber[0] == 0 &&
      !firstNumber.includes(',') &&
      firstNumber.length >= 2
    ) {
      firstNumber = Array.from(firstNumber);
      firstNumber.shift();
      firstNumber = firstNumber.join('');
      display.innerHTML = firstNumber;
    }
    return;
  }
  display.innerHTML = firstNumber;
}
function secondNumberDisplayOutput() {
  // console.log(secondNumber, 2);
  if (!displayCleaned) {
    display.innerHTML = '';
    displayCleaned = true;
    display.style.fontSize = '80px';
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

      if (secondNumber[index] == '.') {
        let rez = Array.from(secondNumber).filter(
          elem => elem != secondNumber[index]
        );

        secondNumber = rez.join('');
      }

      display.innerHTML = secondNumber;

      return;
    }
  } else {
    display.innerHTML = secondNumber;
    if (
      secondNumber.length == 3 ||
      (secondNumber.length == 7 && setMinus != true)
    ) {
      secondNumber += '.';
      secondNumberOfDots++;
    } else if (
      (setMinus == true && secondNumber.length == 4) ||
      secondNumber.length == 8
    ) {
      secondNumber += '.';
      secondNumberOfDots++;
    }
    return;
  }
  display.innerHTML = secondNumber;
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
  let secondOperand, firstOperand;
  afterEqual = true;
  if (!firstPercent) {
    firstOperand = Array.from(firstNumber)
      .filter(elem => elem != '.')
      .join('');
  } else {
    firstOperand = firstNumber;
  }
  if (!secondPercent) {
    secondOperand = Array.from(secondNumber)
      .filter(elem => elem != '.')
      .join('');
  } else {
    secondOperand = secondNumber;
  }
  let newFirstOperand = '';
  for (let i = 0; i < firstOperand.length; i++) {
    if (firstOperand[i] === ',') {
      newFirstOperand += '.';
    } else {
      newFirstOperand += firstOperand[i];
    }
  }
  let newSecondOperand = '';

  for (let i = 0; i < secondOperand.length; i++) {
    if (secondOperand[i] === ',') {
      newSecondOperand += '.';
    } else {
      newSecondOperand += secondOperand[i];
    }
  }
  firstOperand = newFirstOperand;
  secondOperand = newSecondOperand;

  switch (sign) {
    case '/':
      result = +firstOperand / +secondOperand;
      break;
    case '*':
      result = +firstOperand * +secondOperand;
      break;
    case '-':
      result = +firstOperand - +secondOperand;
      break;
    case '+':
      result = +firstOperand + +secondOperand;
      break;
  }
  for (const button of buttons) {
    button.classList.remove('button-right_active');
  }

  if (result.toString().length > 9) {
    display.style.fontSize = '70px';
  } else if (result.toString().length > 10) {
    display.style.fontSize = '65px';
  } else if (result.toString().length > 11) {
    display.style.fontSize = '60px';
  }

  // display.innerHTML = '';
  hasFirstNumber = hasSecondNumber = hasSign = setComma = false;
  firstNumberOfDots = secondNumberOfDots = 0;
  secondNumber = firstNumber = '';
  sign = null;
  console.log('work');
  console.log(result);
  if (result.toString().length > 10) {
    result = result.toExponential(2);
  }
  display.innerHTML = result;
}
