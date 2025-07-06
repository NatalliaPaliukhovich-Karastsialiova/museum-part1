document.addEventListener("DOMContentLoaded", function () {
   slider = tns({
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
    gutter: 42,

    responsive: {

      1920: {
        items: 3,
        gutter: 42
      },
      1600: {
        items: 3,
        gutter: 24
      },
      1025: {
        items: 3,
        gutter: 10
      },
      960: {
        items: 3,
        gutter: 41
      },
      420: {
        items: 2,
        gutter: 16
      }
    }
  });

  const navButtons = document.querySelectorAll(".video__dot");

  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      slider.goTo(index);
    });
  });

  slider.events.on("indexChanged", (info) => {
    stopAllVideos();
    changeMainVideo(info);
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

  rebindVideoEvents();

  function stopAllVideos() {
    document.querySelectorAll('.video__item').forEach(item => {
      const poster = item.dataset.poster;

      item.innerHTML = `
        <img class="video__img" src="./assets/video/poster${poster}.jpg" alt="Poster ${poster}">
        <button class="video__play">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21.4348L18 11L0 0.565216V21.4348Z" fill="white"/>
          </svg>
        </button>
      `;
    });

    rebindVideoEvents();
  }

  function rebindVideoEvents() {
    document.querySelectorAll('.video__item').forEach(item => {
      const videoId = item.dataset.videoId;
      const playBtn = item.querySelector('button');

      if (!playBtn || !videoId) return;

      playBtn.addEventListener('click', () => {

        stopAllVideos();

        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');

        item.innerHTML = '';

        item.appendChild(iframe);
      });
    });
  }

  function changeMainVideo(info){
    const currentSlide = info.displayIndex - 1;
    const mainVideo = document.querySelector('.video__main video');
    if(mainVideo) {
      mainVideo.setAttribute('poster', `./assets/video/poster${currentSlide}.jpg`);
      const source = mainVideo.querySelector('source');
      source?.setAttribute('src', `./assets/video/video${currentSlide}.mp4`);
      mainVideo.load();
    }
  }

});
