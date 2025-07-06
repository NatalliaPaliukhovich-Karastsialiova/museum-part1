const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const video = document.querySelector('.video__wrapper video');
const playBtn = document.getElementById('play-btn');
const bigPlayBtn = document.querySelector('.video__main-play');
const videoWrapper = document.querySelector('.video__main');
const soundBtn = document.getElementById('sound-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const rateIndicator = document.querySelector('.rate__indicator');

const updateSliderBackground = (slider, tolerance = 0) => {
  const val = (parseFloat(slider.value) + tolerance - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #710707 ${val}%, #C4C4C4 ${val}%)`;
}

const updateVideo = (slider, tolerance = 0) => {
  video.currentTime = (slider.value / 100) * video.duration;
}

const togglePlay = () => {
  const playBtnSvg = playBtn.querySelector('use');
  if (video.paused) {
    video.play();
    playBtnSvg.setAttribute('href', './assets/img/video_icons.svg#icon-pause-small');
    bigPlayBtn.classList.add('hidden');
  } else {
    video.pause();
    playBtnSvg.setAttribute('href', './assets/img/video_icons.svg#icon-play-small');
    bigPlayBtn.classList.remove('hidden');
  }
}

progressBar.addEventListener('input', () => updateSliderBackground(progressBar));
progressBar.addEventListener('input', () => updateVideo(progressBar));
volumeSlider.addEventListener('input', () => updateSliderBackground(volumeSlider));
volumeSlider.addEventListener('input', () => changeSoundLevel(volumeSlider));
playBtn.addEventListener('click', togglePlay);
bigPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

updateSliderBackground(volumeSlider);
updateSliderBackground(progressBar);

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    videoWrapper.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

video.addEventListener('timeupdate', () => {
  const progressValue = (video.currentTime / video.duration) * 100 || 0
  updateSliderBackground(progressBar, 0.5);
  progressBar.value = progressValue;
});

video.addEventListener('ended', () => {
  const playBtnSvg = playBtn.querySelector('use');
  playBtnSvg.setAttribute('href', './assets/img/video_icons.svg#icon-play-small');
  bigPlayBtn.classList.remove('hidden');
  video.currentTime = 0;
  video.load();
});


soundBtn.addEventListener('click', () => {
  const soundBtnSvg = soundBtn.querySelector('use');
  video.muted = !video.muted;
  const icon = video.muted || video.volume === 0 ? './assets/img/video_icons.svg#icon-sound-off' : './assets/img/video_icons.svg#icon-sound-level';
  soundBtnSvg.setAttribute('href', icon);
});

const changeSoundLevel = (volumeSlider) => {
  const soundBtnSvg = soundBtn.querySelector('use');
  video.volume = volumeSlider.value;
  video.muted = volumeSlider.value == 0;
  const icon = video.muted ? './assets/img/video_icons.svg#icon-sound-off' : './assets/img/video_icons.svg#icon-sound-level';
  soundBtnSvg.setAttribute('href', icon);
}

const changePlaybackRate = (delta) => {
  video.playbackRate = Math.min(2, Math.max(0.25, video.playbackRate + delta));
  showPlaybackRate(video.playbackRate);
}

let rateTimeout;

const showPlaybackRate = (rate) => {
  rateIndicator.textContent = `${rate.toFixed(2)}×`;
  rateIndicator.classList.remove('hidden');
  rateIndicator.classList.add('show');
  clearTimeout(rateTimeout);
  rateTimeout = setTimeout(() => {
    rateIndicator.classList.remove('show');
  }, 1000);
}

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if (['input'].includes(document.activeElement.tagName.toLowerCase())) return;

  switch (key) {
    case ' ':
      event.preventDefault();
      togglePlay();
      break;

    case 'm':
    case 'ь':
      soundBtn.click();
      break;

    case 'f':
    case 'а':
      fullscreenBtn.click();
      break;
  }

  if (event.code === 'Comma' && event.shiftKey) {
    changePlaybackRate(-0.25);
  }

  if (event.code === 'Period' && event.shiftKey) {
    changePlaybackRate(0.25);
  }
});


video.addEventListener('loadeddata', () => {
  const playBtnSvg = playBtn.querySelector('use');
  playBtnSvg.setAttribute('href', './assets/img/video_icons.svg#icon-play-small');
  bigPlayBtn.classList.remove('hidden');
  updateSliderBackground(progressBar);
});
