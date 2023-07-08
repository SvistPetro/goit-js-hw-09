import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
let formData = {};

formEl.addEventListener('input', onFormInput);
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
}

function onFormSubmit(evt) {
  evt.preventDefault();
  
  let delayEl = Number(formData.delay);
  const stepEl = Number(formData.step);
  const amountEl = Number(formData.amount);
  
  for (let i = 1; i <= amountEl; i +=1) {
    createPromise(i, delayEl)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });

  delayEl += stepEl;
  };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}