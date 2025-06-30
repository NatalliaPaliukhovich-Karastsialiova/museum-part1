const burgerBtn = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');

burgerBtn.addEventListener('click', () => {
  menu.classList.toggle('header__menu-active');
  burgerBtn.classList.toggle('header__burger-open');
});
