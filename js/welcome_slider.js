document.addEventListener("DOMContentLoaded", function () {
  const slider = tns({
    container: ".welcome__slider",
    items: 1,
    slideBy: 1,
    autoplay: false,
    mouseDrag: true,
    controls: false,
    nav: false,
    touch: true,
    speed: 400,
    loop: true,
    rewind: false,
    preventScrollOnTouch: 'auto',
  });

  const navButtons = document.querySelectorAll(".slider__dots .dot");

  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      slider.goTo(index);
    });
  });

  slider.events.on("indexChanged", (info) => {
    navButtons.forEach(btn => btn.classList.remove("active"));
    navButtons[info.displayIndex - 1].classList.add("active");
    document.querySelector(".slider__index-start").textContent = '0' + info.displayIndex;
  });

  let isAnimating = false;

  slider.events.on("transitionStart", () => {
    isAnimating = true;
  });

  slider.events.on("transitionEnd", () => {
    isAnimating = false;
  });

  document.querySelector('.slider__btn.prev').addEventListener('click', () => {
    if (!isAnimating) slider.goTo('prev');
  });

  document.querySelector('.slider__btn.next').addEventListener('click', () => {
    if (!isAnimating) slider.goTo('next');
  });
});
