const priceList = new Map([["permanent", 20], ["temporary", 25], ["combined", 40]]);

export function addNumber(event, value) {
  const container = event.currentTarget;
  const numberEl = container.querySelector('.number');
  let number = parseInt(numberEl.textContent);
  numberEl.textContent = number + value;
  calculateTotalBasedOnCounter();
}

export function minusNumber(event, value) {
  const container = event.currentTarget;
  const numberEl = container.querySelector('.number');
  let number = parseInt(numberEl.textContent);
  if(number) numberEl.textContent = number - value;
  calculateTotalBasedOnCounter();
}

export function calculateTotalBasedOnRadio(event) {
  calculateTotalAmount(event.target.value);
  saveInLocalStorage('ticketType', event.target.value);
}

const calculateTotalAmount = (key) => {
  const totalAmount = document.querySelector('.tickets__total-amount .total__value');

  const basic = parseInt(document.querySelector('.number.basic').textContent);
  const senior = parseInt(document.querySelector('.number.senior').textContent);

  totalAmount.textContent = (basic * priceList.get(key)) + (senior * priceList.get(key) / 2);
  saveInLocalStorage('totalAmount', totalAmount.textContent);
}

const calculateTotalBasedOnCounter = (event) => {
  const selected = document.querySelector('input[name="tickets-option"]:checked');
  if (selected) {
    calculateTotalAmount(selected.value);
    saveInLocalStorage('ticketType', selected.value);
  }
}

function saveInLocalStorage(valueName, value) {
  localStorage.setItem(valueName, value);
}

export function changeLocalStorage() {
  const basic = document.querySelector('.number.basic');
  const senior = document.querySelector('.number.senior');
  saveInLocalStorage('basicTicketsNumber', basic.textContent);
  saveInLocalStorage('seniorTicketsNumber', senior.textContent);
}

export function initTicketsSection() {

  const basicTicketsNumber =localStorage.getItem('basicTicketsNumber');
  const seniorTicketsNumber =localStorage.getItem('seniorTicketsNumber');
  const ticketType =localStorage.getItem('ticketType') || 'permanent';

  const radioBtn = document.querySelector(`input[value="${ticketType}"]`);
  if(radioBtn) radioBtn.checked = true;

  const basic = document.querySelector('.number.basic');
  const senior = document.querySelector('.number.senior');

  basic.textContent = basicTicketsNumber || '1';
  senior.textContent = seniorTicketsNumber || '1';

  calculateTotalAmount(ticketType);
}

export function initComparisons() {
  const overlayImg = document.querySelector(".explore__comp-overlay");
  if(overlayImg) compareImages(overlayImg);

  function compareImages(img) {
    let slider, clicked = 0, w, h;

    w = img.offsetWidth;
    h = img.offsetHeight;

    img.style.width = (w / 2) + "px";

    slider = document.createElement("div");
    slider.classList.add("explore__comp-slider");

    const lineTop = document.createElement("div");
    lineTop.classList.add("explore__comp-line", "line-top");
    slider.appendChild(lineTop);

    const circle = document.createElement("div");
    circle.classList.add("explore__comp-circle");
    slider.appendChild(circle);

    const lineBottom = document.createElement("div");
    lineBottom.classList.add("explore__comp-line", "line-bottom");
    slider.appendChild(lineBottom);

    img.parentElement.insertBefore(slider, img);

    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {

      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      let pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      let a, x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
