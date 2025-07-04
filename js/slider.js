document.addEventListener("DOMContentLoaded", function () {
  const slider = tns({
    container: ".welcome__slider",
    items: 1,
    slideBy: 1,
    autoplay: true,
    mouseDrag: true,
    autoplayButtonOutput: false,
    controls: false,
    nav: false,
    center: true,
    touch: true,
    speed: 1000,
    preventScrollOnTouch: 'auto',
  });

  document.querySelector('.slider__btn.prev').addEventListener('click', () => slider.goTo('prev'));
  document.querySelector('.slider__btn.next').addEventListener('click', () => slider.goTo('next'));

  const navButtons = document.querySelectorAll(".slider__dots .dot");

  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      slider.goTo(index);
    });
  });

  slider.events.on("indexChanged", (info) => {
    navButtons.forEach(btn => btn.classList.remove("active"));
    navButtons[info.displayIndex - 1].classList.add("active");
  });
});
