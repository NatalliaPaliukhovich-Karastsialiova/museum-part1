import {getPrice} from './utils.js';

const dialog = document.querySelector('.tickets__dialog');
const buyTicketsBtn = document.querySelector('.tickets__btn');
const closeBtn = document.querySelector('.close__button');
const typeSelect = document.getElementById("type");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

buyTicketsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.classList.add('open');
  initValues();
  updatePriceInfo();

  requestAnimationFrame(() => {
    dialog.setAttribute('open', '');
  });
})

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

const closeDialog = () => {

  dialog.classList.add('hidden');

  dialog.classList.remove('hidden');
  dialog.classList.remove('open');
  setTimeout(() => {
    dialog.close();
    dialog.removeAttribute('open');
    document.body.classList.remove('modal-open');
  }, 800)

};

closeBtn.addEventListener('click', closeDialog);

const initValues = () => {
  const basicTicketsNumber = localStorage.getItem('basicTicketsNumber');
  const seniorTicketsNumber = localStorage.getItem('seniorTicketsNumber');
  const ticketType = localStorage.getItem('ticketType');

  const typeSelect = document.getElementById("type");
  const basicType = document.getElementById("basic-type");
  const seniorType = document.getElementById("senior-type");

  basicType.textContent = basicTicketsNumber || '1';
  seniorType.textContent = seniorTicketsNumber || '1';
  typeSelect.value = ticketType || 'permanent';
}

const updatePriceInfo = (key) => {
  const genPrice = document.querySelector('.dialog__general-price');
  const senPrice = document.querySelector('.dialog__senior-price');
  const genPricePreview = document.querySelector('.dialog__general-price-preview');
  const senPricePreview = document.querySelector('.dialog__senior-price-preview');
  const seniorNumber = document.getElementById('senior-type');
  const basicNumber = document.getElementById('basic-type');
  const pillBasic = document.querySelector('.pill-basic');
  const pillSenior = document.querySelector('.pill-senior');
  const basicTotal = document.querySelector('.basic-total');
  const seniorTotal = document.querySelector('.senior-total');
  const total = document.querySelector('.dialog__total .total');

  key = key || typeSelect.value;
  const generalPrice = getPrice(key);
  const seniorPrice = getPrice(key, true);
  genPrice.textContent = generalPrice;
  senPrice.textContent = seniorPrice;
  genPricePreview.textContent = generalPrice;
  senPricePreview.textContent = seniorPrice;
  pillBasic.textContent = basicNumber.textContent;
  pillSenior.textContent = seniorNumber.textContent;
  basicTotal.textContent = generalPrice * basicNumber.textContent;
  seniorTotal.textContent = seniorPrice * seniorNumber.textContent;
  total.textContent = +basicTotal.textContent + +seniorTotal.textContent + ' €';
}

typeSelect.addEventListener('change', (event) => {
  updatePriceInfo(event.target.value);
})

const validateName = (value) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s]{3,15}$/;
  return regex.test(value.trim());
};

const validateEmail = (value) => {
  const regex = /^[a-zA-Z0-9_-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/;
  return regex.test(value.trim());
};

const validatePhone = (value) => {
  const cleaned = value.replace(/[\s\-]/g, "");
  const regex = /^(\d[\d\s-]{0,9})$/;
  return regex.test(value) && cleaned.length <= 10;
};

const addValidation = (input, validator, message) => {
  const errorMsg = input.parentElement.querySelector(".error-message");

  input.addEventListener("input", () => {
    const value = input.value;
    if (!validator(value)) {
      input.classList.add("invalid");
      errorMsg.textContent = message;
    } else {
      input.classList.remove("invalid");
      errorMsg.textContent = "";
    }
  });
}

addValidation(nameInput, validateName, "Name must be 3–15 letters and can include spaces.");
addValidation(emailInput, validateEmail, "Enter a valid email like: username@example.com");
addValidation(phoneInput, validatePhone, "Phone number must contain up to 10 digits");

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const basicType = document.getElementById("basic-type");
  const seniorType = document.getElementById("senior-type");

  const previewDate = document.getElementById("preview-date");
  const previewTime = document.getElementById("preview-time");
  const previewType = document.getElementById("preview-type");

  const counters = document.querySelectorAll(".dialog__counter");

  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  for (let hours = 9; hours <= 18; hours++) {
    for (let mins = 0; mins < 60; mins += 30) {
      if (hours === 18 && mins > 0) continue;
      const hh = String(hours).padStart(2, "0");
      const mm = String(mins).padStart(2, "0");
      const timeOption = document.createElement("option");
      timeOption.value = `${hh}:${mm}`;
      timeOption.textContent = `${hh}:${mm}`;
      timeSelect.appendChild(timeOption);
    }
  }

  function updatePreview() {
    const date = dateInput.value;
    const time = timeSelect.value;
    const type = typeSelect.options[typeSelect.selectedIndex].textContent;

    let formattedDate = "—";
    if (date) {
      const dateObj = new Date(date + "T00:00:00");
      formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
    }

    previewDate.textContent = `Date: ${date || "—"}`;
    previewTime.textContent = `Time: ${time || "—"}`;
    previewType.textContent = `Type: ${type}`;
  }

  [dateInput, timeSelect, typeSelect].forEach(el => {
    el.addEventListener("input", updatePreview);
  });

  counters.forEach(counter => {
    const minusBtn = counter.querySelector("button:first-child");
    const plusBtn = counter.querySelector("button:last-child");
    const numberDisplay = counter.querySelector(".counter__number");

    minusBtn.addEventListener("click", () => {
      let value = parseInt(numberDisplay.textContent);
      if (value > 0) {
        numberDisplay.textContent = value - 1;
        updatePriceInfo();
      }
    });

    plusBtn.addEventListener("click", () => {
      let value = parseInt(numberDisplay.textContent);
      numberDisplay.textContent = value + 1;
      updatePriceInfo();
    });
  });

  updatePreview();
});

