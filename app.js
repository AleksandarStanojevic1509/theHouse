import { renderStorePage, renederProductModal } from "./store.js";
import {logInNewUser, signOutUser, checkLS} from "./users.js"

//DOM
const toTopHendler = document.getElementById("to-top");
const storageHendler = document.querySelectorAll(".store-btn");
const mainBox = document.querySelector("main");
const loader = document.querySelector("#loader");
const ftrCardHandler = document.querySelectorAll(".ftr-card a");
const logInHandler = document.getElementById('log-in-box');
// const logIn = document.getElementById('log-in-bck');
const logInCloseHandler = document.querySelector('.fa-times');
const logInForm = document.querySelector('#log-in form')
const signOut = document.getElementById('sign-out-box')
const displayUserName = document.querySelector('#log-in-box p');


checkLS(displayUserName)


logInForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  logInNewUser(displayUserName)  
  logInForm.reset()
  document.getElementById('log-in-bck').style.display = 'none'
})

signOut.addEventListener('click', ()=>{
  signOutUser(displayUserName)
} )

logInHandler.addEventListener('click', ()=>{
  document.getElementById('log-in-bck').style.display = 'grid'
})

logInCloseHandler.addEventListener('click', ()=>{
  document.getElementById('log-in-bck').style.display = 'none'
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

// add to Cart or add to Wishlist
  mainBox.addEventListener('click', (event =>{
  
    if (event.target.outerHTML === '<i class="fas fa-shopping-bag"></i>'){
      // if(){
        // proveri da li je neko logovan ako je localstore prazan izbaci log in
      // }
      // else {
        // ako je loginovan dodaj u korpu
      // }
      console.log('KORPA')
    }
    if (event.target.outerHTML === '<i class="fas fa-heart"></i>'){
       // if(){
        // proveri da li je neko logovan ako je localstore prazan izbaci log in
      // }
      // else {
        // ako je loginovan dodaj u litu zelja
      // }
      console.log('LISTA ZELAJ')
    }
    
  }))


// sign up 
document.querySelector('#sign-up form').addEventListener('submit', (event)=>{
  event.preventDefault()
  let userName = document.getElementById('username')

  db.collection('users').doc().set({
    user:userName.value
  })
  document.querySelector('#sign-up form').reset()
})

// db.collection('products').doc().set({
//   dimension:{
//     depth: 65,
//     height: 130,
//     width: 103
//   },
//   info:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae deleniti sed, distinctio iste eius iure, voluptates qui commodi ut ratione non dolor molestias eaque iusto quis quas natus saepe?',
//   name:'Dean',
//   price: 611.99,
//   quantity: 15,
//   sku:'DJH342',
//   url:'https://firebasestorage.googleapis.com/v0/b/thehouse-b0245.appspot.com/o/img%2Fin-08.jpg?alt=media&token=dcd12ea8-29cc-4d76-9d69-36f3d47c7deb'
// })