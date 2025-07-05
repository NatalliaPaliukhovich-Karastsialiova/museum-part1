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
}

const calculateTotalAmount = (key) => {
  const numbers = document.querySelectorAll('.tickets__counter .number');
  const totalAmount = document.querySelector('.tickets__total-amount .total__value');

  const totalTickets = [...numbers].reduce((acc, item) => {
    acc += parseInt(item.textContent);
    return acc;
  }, 0)

  totalAmount.textContent = totalTickets * priceList.get(key);
}

const calculateTotalBasedOnCounter = (event) => {
  const selected = document.querySelector('input[name="tickets-option"]:checked');
  if (selected) {
    calculateTotalAmount(selected.value);
  }
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
