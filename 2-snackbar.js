import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as o}from"./assets/vendor-BbbuE1sJ.js";const l=document.querySelectorAll('input[type="radio"]'),i=document.querySelector("form"),c=`
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6.5" y="6.5" width="19" height="19" rx="9.5" stroke="black"/>
  </svg>`,a=`
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6.5" y="6.5" width="19" height="19" rx="9.5" stroke="#4E75FF"/>
    <rect x="10" y="10" width="12" height="12" rx="6" fill="#4E75FF"/>
  </svg>`,r={position:"topRight",timeout:3e3,transitionIn:"fadeInDown"};function m(e){if(document.querySelectorAll(".svg").forEach(n=>{n.innerHTML=c}),e.target.checked){const n=e.target.nextElementSibling;n.innerHTML=a}}l.forEach(e=>{const t=document.createElement("span");t.classList.add("svg"),t.innerHTML=c,e.insertAdjacentElement("afterend",t),e.addEventListener("change",m)});function d(e){e.preventDefault();const t=i.elements.delay.value,n=i.elements.state.value;g(t,n).then(s=>{o.success({...r,message:`✅ Fulfilled promise in ${s}ms`})}).catch(s=>{o.error({...r,message:`❌ Rejected promise in ${s}ms`})})}i.addEventListener("submit",d);function g(e,t){return new Promise((n,s)=>{t==="fulfilled"?n(e):s(e)})}
//# sourceMappingURL=2-snackbar.js.map
