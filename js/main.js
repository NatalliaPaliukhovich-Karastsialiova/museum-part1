import * as utils from './utils.js';

const burgerBtn = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const ticketsCounter = document.querySelectorAll('.tickets__counter');
const ticketsType = document.querySelector('.tickets__type');

const closeMenu = () => {
  menu.classList.remove('header__menu-active');
  burgerBtn.classList.remove('header__burger-open');
}

burgerBtn.addEventListener('click', () => {
  menu.classList.toggle('header__menu-active');
  burgerBtn.classList.toggle('header__burger-open');
});

menu.addEventListener('click', (event) => {
  if(event.target.classList.contains('header__link') ||
      event.target.classList.contains('header__item')){

      closeMenu();
  }
})

document.addEventListener('click', (event) => {
  const target = event.target;
  const isClickInsideMenu = menu.contains(target) || burgerBtn.contains(target);
  if (!isClickInsideMenu && menu.classList.contains('header__menu-active')) {
    closeMenu();
  }
});

const checkState = (event) => {

  if(event.target.classList.contains('minus')) {
    utils.minusNumber(event, 1)
  }

  if(event.target.classList.contains('plus')) {
    utils.addNumber(event, 1);
  }

}

[...ticketsCounter].forEach(item => {
  item.addEventListener('click', checkState)
})

ticketsType.addEventListener('change', function(event) {
  if (event.target.name === 'tickets-option') {
    utils.calculateTotalBasedOnRadio(event);
  }
});

utils.initComparisons();

