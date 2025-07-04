document.addEventListener("DOMContentLoaded", function () {
  const slider = tns({
    container: ".video__grid",
    items: 3,
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
    gutter: 42
  });

  const navButtons = document.querySelectorAll(".video__dot");

  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      slider.goTo(index);
    });
  });

  slider.events.on("indexChanged", (info) => {
    document.querySelectorAll('.video__item iframe').forEach(iframe => stopVideo(iframe));
    navButtons.forEach(btn => btn.classList.remove("active"));
    navButtons[info.displayIndex - 1].classList.add("active");
  });

  let isAnimating = false;

  slider.events.on("transitionStart", () => {
    isAnimating = true;
  });

  slider.events.on("transitionEnd", () => {
    isAnimating = false;
  });

  document.querySelector('.video__arrow.prev').addEventListener('click', () => {
    if (!isAnimating) slider.goTo('prev');
  });

  document.querySelector('.video__arrow.next').addEventListener('click', () => {
    if (!isAnimating) slider.goTo('next');
  });

  function stopVideo(iframe) {
    const src = iframe.getAttribute('src');
    iframe.setAttribute('src', '');
    iframe.setAttribute('src', src);
  }
});
