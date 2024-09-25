import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const radioBtnsEl = document.querySelectorAll('input[type="radio"]');
const formEl = document.querySelector('form');

const uncheckedSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6.5" y="6.5" width="19" height="19" rx="9.5" stroke="black"/>
  </svg>`;

const checkedSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6.5" y="6.5" width="19" height="19" rx="9.5" stroke="#4E75FF"/>
    <rect x="10" y="10" width="12" height="12" rx="6" fill="#4E75FF"/>
  </svg>`;

const messageConfig = {
  position: 'topRight',
  timeout: 3000,
  transitionIn: 'fadeInDown',
};

function handleRadioChange(event) {
  const svgElements = document.querySelectorAll('.svg');

  svgElements.forEach(el => {
    el.innerHTML = uncheckedSvg;
  });

  if (event.target.checked) {
    const svgContainer = event.target.nextElementSibling;
    svgContainer.innerHTML = checkedSvg;
  }
}

radioBtnsEl.forEach(btn => {
  const svgBox = document.createElement('span');
  svgBox.classList.add('svg');
  svgBox.innerHTML = uncheckedSvg;

  btn.insertAdjacentElement('afterend', svgBox);
  btn.addEventListener('change', handleRadioChange);
});

function handleFormSubmit(event) {
  event.preventDefault();

  const delay = formEl.elements.delay.value;
  const radioValue = formEl.elements.state.value;

  createPromise(delay, radioValue)
    .then(delay => {
      iziToast.success({
        ...messageConfig,
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        ...messageConfig,
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}

formEl.addEventListener('submit', handleFormSubmit);

function createPromise(delay, state) {
  return new Promise((res, rej) => {
    state === 'fulfilled' ? res(delay) : rej(delay);
  });
}
