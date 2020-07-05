import { renderStorePage, renederProductModal } from "./store.js";
import {logInNewUser, logOutBox, checkLS, signUp} from "./users.js";

//DOM
const toTopHendler = document.getElementById("to-top");
const storageHendler = document.querySelectorAll(".store-btn");
const mainBox = document.querySelector("main");
const loader = document.querySelector("#loader");
const ftrCardHandler = document.querySelectorAll(".ftr-card a");
const logInHandler = document.getElementById('log-in-box');
const closeHandler = document.querySelectorAll('.fa-times');
const logInForm = document.querySelector('#log-in form');
const logOut = document.getElementById('log-out-box');
const displayUserName = document.querySelector('#log-in-box p');
const createAccHandler = document.querySelector('#log-in button');
const okHandler = document.querySelectorAll('.ok-btn');
const okLoginHandler = document.querySelector('#alert-login-box button');



checkLS(displayUserName)


logInForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  logInNewUser(displayUserName)  
  logInForm.reset()
  document.getElementById('log-in-bck').style.display = 'none'
})

logOut.addEventListener('click', ()=>{
  window.scrollTo(0, 0); 
  logOutBox(displayUserName)
} )

logInHandler.addEventListener('click', ()=>{
  window.scrollTo(0, 0); 
  document.getElementById('log-in-bck').style.display = 'grid'
  document.getElementById('log-in-bck').style.animation = 'fadeInDown 0.5s'

})

closeHandler.forEach((elem)=>{
  elem.addEventListener('click', () =>{
    if (document.getElementById('log-in-bck').style.display = 'grid'){
      document.getElementById('log-in-bck').style.animation = 'fadeOutDown 1s'
      setTimeout(()=>{
        document.getElementById('log-in-bck').style.display = 'none';
      },501)

    }
    if (document.getElementById('sign-up-bck').style.display = 'grid'){
      document.getElementById('sign-up-bck').style.animation = 'fadeOutDown 1s'
      setTimeout(()=>{        
        document.getElementById('sign-up-bck').style.display = 'none';
      },501)

    }
  })
})

storageHendler.forEach((event) => {
  event.addEventListener("click", (e) => {
    window.scrollTo(0, 0); 
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
    toTopHendler.style.animation = "backInUp 1s";
    toTopHendler.style.display = "block";
  } else {
    toTopHendler.style.display = "none";
  }
});

// add to Cart or add to Wishlist
  mainBox.addEventListener('click', (event =>{
  
    if (event.target.outerHTML === '<i class="fas fa-shopping-bag"></i>'){
      if(localStorage.getItem('user') === null || localStorage.getItem('user') === ''){
        // console.log('nije')
        document.getElementById('alert-login-box').style.display = 'flex';  
        document.getElementById('alert-login-box').style.animation = 'fadeInDown 0.5s';
      }
      else {
        console.log('logovan')

      }
    }
    if (event.target.outerHTML === '<i class="fas fa-heart"></i>'){
      if(localStorage.getItem('user') === null || localStorage.getItem('user') === ''){
        // console.log('nije')
        document.getElementById('alert-login-box').style.display = 'flex';  
        document.getElementById('alert-login-box').style.animation = 'fadeInDown 0.5s';
      }
      else {
        console.log('logovan')

      }
    }
    
  }))


// sign up if log in fail
document.querySelector('#sign-up form').addEventListener('submit', signUp)


// create account

createAccHandler.addEventListener('click', ()=>{
  document.getElementById('sign-up-bck').style.display = 'grid';
  document.getElementById('sign-up-bck').style.animation = 'fadeInDown 0.5s'

  document.getElementById('log-in-bck').style.display = 'none';
})

okHandler.forEach(elem =>{
  elem.addEventListener('click', ()=>{
    document.getElementById('pass-box').style.display = 'none';
    document.getElementById('user-box').style.display = 'none';
    document.getElementById('alert-login-box').style.display = 'none';
    document.getElementById('account-success-box').style.display = 'none';
  })
})

okLoginHandler.addEventListener('click', ()=>{
  document.getElementById('log-in-bck').style.display = 'flex';
  document.getElementById('log-in-bck').style.animation = 'fadeInDown 0.5s'
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