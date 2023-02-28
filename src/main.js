let numButtons = document.querySelectorAll('.button-main');
let calculator = document.querySelector('.calculator');

let firstNumber, secondNumber, sign;

calculator.addEventListener('pointerdown', e => {
  let button = e.target;
  if (!button.tagName == 'BUTTON') return;
  if (button.classList.contains('button-main')) {
    button.classList.add('button-main_active');
  } else if (button.classList.contains('button-up')) {
    button.classList.add('button-up_active');
  } else if (button.classList.contains('button-right')) {
    button.classList.add('button-right_active');
  }
});
document.addEventListener('pointerup', e => {
  let button = e.target;
  if (!button.tagName == 'BUTTON') return;
  if (button.classList.contains('button-main_active')) {
    button.classList.remove('button-main_active');
  } else if (button.classList.contains('button-up_active')) {
    button.classList.remove('button-up_active');
  } else if (button.classList.contains('button-right_active')) {
    button.classList.remove('button-right_active');
  }
});
