import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   body: document.querySelector('body'),
   form: document.querySelector('form.form'),
   delay: document.querySelector('[name="delay"]'),
   step: document.querySelector('[name="step"]'),
   amount: document.querySelector('[name="amount"]'),
}
 
refs.body.style.backgroundColor = '#f5b8de';
refs.form.addEventListener('click', createOtherPromises);
 
function FirstPromiseCreate(position, delay) {
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
 
 function createOtherPromises (e) {
   e.preventDefault();

   let valueDelay = Number(refs.delay.value);
   let step = Number(refs.step.value);
   let amount = Number(refs.amount.value);

   for (let i = 1; i <= amount; i += 1) {
     let promiseDelay = valueDelay + step * i;

     FirstPromiseCreate(i, promiseDelay)
       .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
       })
       .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
   }
 }
<<<<<<< Updated upstream
=======
 
 

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
 
>>>>>>> Stashed changes
