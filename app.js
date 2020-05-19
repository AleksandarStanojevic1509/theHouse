import { renderStorePage, renederProductModal } from "./store.js";
import {logInNewUser, signOutUser, checkLS} from "./users.js"

//DOM
const toTopHendler = document.getElementById("to-top");
const storageHendler = document.querySelectorAll(".store-btn");
const mainBox = document.querySelector("main");
const loader = document.querySelector("#loader");
const ftrCardHandler = document.querySelectorAll(".ftr-card a");
const logInHandler = document.getElementById('log-in-box');
const logIn = document.getElementById('log-in');
const logInCloseHandler = document.querySelector('.fa-times');
const logInForm = document.querySelector('#log-in form')
const signOut = document.getElementById('sign-out-box')
const displayUserName = document.querySelector('#log-in-box p');


checkLS(displayUserName)


logInForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  logInNewUser(displayUserName)  
  logInForm.reset()
  logIn.style.display = 'none'
})

signOut.addEventListener('click', ()=>{
  signOutUser(displayUserName)
} )

logInHandler.addEventListener('click', ()=>{
  logIn.style.display = 'grid'
})

logInCloseHandler.addEventListener('click', ()=>{
  logIn.style.display = 'none'
})



storageHendler.forEach((event) => {
  event.addEventListener("click", (e) => {
    renderStorePage(loader, mainBox);
  });
});

ftrCardHandler.forEach((event) => {
  event.addEventListener("click", () => {
    renderStorePage(loader, mainBox);
  });
});


mainBox.addEventListener ('click', event =>{
  if(event.target.tagName === 'A'){
    localStorage.setItem('id', `${event.target.id}`);
    renederProductModal(mainBox);      
  }
  else if(event.target.tagName === 'H5'){
    const prodCardModal = document.querySelector('#product-card');
    prodCardModal.remove();
  }
})

document.addEventListener("scroll", (event) => {
  if (
    document.body.scrollTop > 120 ||
    document.documentElement.scrollTop > 120
  ) {
    toTopHendler.style.display = "block";
  } else {
    toTopHendler.style.display = "none";
  }
});
