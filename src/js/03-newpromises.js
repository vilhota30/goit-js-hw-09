import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   body: document.querySelector('body'),
   form: document.querySelector('form.form'),
   delay: document.querySelector('[name="delay"]'),
   step: document.querySelector('[name="step"]'),
   amount: document.querySelector('[name="amount"]'),
}


refs.body.style.backgroundColor = '#f5b8de';
refs.form.addEventListener('submit', createOtherPromises);

function createOtherPromises (e) {
   e.preventDefault();

   let delay = Number(refs.delay.value);
   let step = Number(refs.step.value);
   let amount = Number(refs.amount.value);

   for (let i = 1; i <= amount; i += 1) {
    
     FirstPromiseCreate(i, delay)
       .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
       })
       .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
       });
       delay += step;
   }
}
 
 
function FirstPromiseCreate(position, delay) {
    const obj = { position, delay };
    const shouldResolve = Math.random() > 0.3;
    
   return new Promise((resolve, reject) => {
    
     setTimeout(() => {
       if (shouldResolve) {
         resolve(obj);
       } else {
        reject(obj);
       }
     }, delay);
   });
}
 
 