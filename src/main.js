//main file
let numButtons = document.querySelectorAll('.button-main');
let calculator = document.querySelector('.calculator');
let display = document.querySelector('.display');
let hasFirstNumber, hasSecondNumber, hasSign, sign, secondNumber, firstNumber;
firstNumber = secondNumber = '';

calculator.addEventListener('pointerdown', e => {
  let button = e.target;

  if (!button.tagName == 'BUTTON') return;

  if (button.classList.contains('button-main')) {
    button.classList.add('button-main_active');
    if (firstNumber.length == 11) hasFirstNumber = true;
    if (!hasFirstNumber) {
      firstNumber += button.firstChild.data;
      firstNumberDisplayOutput();
    } else {
      console.log(1);
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
  }
});
document.addEventListener('pointerup', e => {
  let button = e.target;

  if (!button.tagName == 'BUTTON') return;

  if (button.classList.contains('button-main_active')) {
    button.classList.remove('button-main_active');
    // } else if (button.classList.contains('button-right_active')) {
    //   button.classList.remove('button-right_active');
  } else if (button.classList.contains('button-up_active')) {
    button.classList.remove('button-up_active');
  }
});

function firstNumberDisplayOutput() {
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

  if (firstNumber.length == 3 || firstNumber.length == 7) {
    firstNumber += '.';
  }
}
function secondNumberDisplayOutput(button) {
  button.classList.remove('button-right_active');
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
