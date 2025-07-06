const dialog = document.querySelector('.tickets__dialog');
const buyTicketsBtn = document.querySelector('.tickets__btn');
const closeBtn = document.querySelector('.close__button');

buyTicketsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.classList.add('open');
  initValues();

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

  dialog.addEventListener('transitionend', function handler(event) {

    if (event.propertyName !== 'opacity') return;

    dialog.classList.remove('hidden');
    dialog.classList.remove('open');
    dialog.close();
    dialog.removeAttribute('open');
    document.body.classList.remove('modal-open');

    dialog.removeEventListener('transitionend', handler);
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const typeSelect = document.getElementById("type");
  const basicType = document.getElementById("basic-type");
  const seniorType = document.getElementById("senior-type");

  const previewDate = document.getElementById("preview-date");
  const previewTime = document.getElementById("preview-time");
  const previewType = document.getElementById("preview-type");

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

  updatePreview();
});

