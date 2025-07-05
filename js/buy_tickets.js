const dialog = document.querySelector('.tickets__dialog');
const buyTicketsBtn = document.querySelector('.tickets__btn');

buyTicketsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.showModal();
  document.body.classList.add('modal-open');

  requestAnimationFrame(() => {
    dialog.setAttribute('open', '');
  });
})

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
    document.body.classList.remove('modal-open');
  }
});
