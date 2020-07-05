const alertLogin = ()=>{
  document.getElementById('alert-bck').style.display = 'grid';
  document.getElementById('alert-cancel').addEventListener('click', ()=>{
    document.getElementById('alert-bck').style.display = 'none';
  })
  document.getElementById('alert-yes').addEventListener('click', ()=>{
    document.getElementById('alert-bck').style.display = 'none';
    document.getElementById('sign-up-bck').style.display = 'grid';
  })
}

const logOutUser = (displayUserName)=>{
  if (displayUserName.textContent !== 'Log in'){
    // alert logout box cancel or yes (yes) onda ovo odole
      displayUserName.textContent = 'Log in';
      localStorage.setItem('user', '');        
  }
}

export const checkLS = (displayUserName) =>{
    if(localStorage.getItem('user') === null){
        displayUserName.textContent = 'Log in'
      }
      else if (localStorage.getItem('user') !== ''){
        displayUserName.innerHTML = `Hi, <span id="log-in-name">${localStorage.getItem('user')}</span> `
      }
}


export const logInNewUser = (displayUserName) => {
    let user = localStorage.getItem('user')
    const userName = document.querySelector("#log-in-user").value;
    const userPass = document.querySelector("#log-in-pass").value;
    console.log(userName, userPass);
    db.collection("users")
    .where("userName", "==", `${userName}`)
    .get()
    .then((querySnapshot) => {

        if (querySnapshot.size > 0) {
        querySnapshot.docs.forEach((doc) => {
        const obj = doc.data();
        console.log(obj)
            if (userPass === obj.password) {
                localStorage.setItem("user", `${obj.userName}`);
                user = localStorage.getItem('user');
                displayUserName.innerHTML = `Hi, <span id="log-in-name">${user}</span>`;
            } 
            else {
                console.log('wrong pass')
                //modal sa upozorenjem
            }     
          }) 
        } 
        else {
          console.log("No such document!");
          alertLogin();
        }
      })
      .catch(function(error) {
        console.log("Error getting document: ", error);
      });

};



export const logOutBox = (displayUserName)=>{
  document.getElementById('log-out-bck').style.display = 'grid';
  document.getElementById('log-out-bck').style.animation = 'fadeInDown 0.5s'

  

  document.getElementById('log-out-cancel').addEventListener('click', ()=>{
    document.getElementById('log-out-bck').style.display = 'none';
  })

  document.getElementById('log-out-yes').addEventListener('click', ()=>{
    document.getElementById('log-out-bck').style.display = 'none';
    logOutUser(displayUserName);
  })
}


// create new acount

export const signUp = (event)=>{
  event.preventDefault()

  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const userName = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;
  const rePass = document.getElementById('re-pass').value;
  let password;

  if (firstName === '' && lastName == '' && userName == '' && email == '' && pass == '' && rePass == ''){
    alert('Sva polja moraju biti popunjena')
  }
  else {
    if ( pass === rePass){
      password = document.getElementById('pass').value;
  
      db.collection("users")
      .where("userName", "==", `${userName}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
            querySnapshot.docs.forEach((doc) => {  
              document.getElementById('user-box').style.display = 'flex';  
              document.getElementById('user-box').style.animation = 'fadeInDown 0.5s'
        }) 
        }
        else {
          db.collection('users').doc().set({
            email:email,
            firstName:firstName,
            lastName:lastName,
            password:password,
            userName:userName
          })
          document.getElementById('account-success-box').style.display = 'flex';
          document.getElementById('account-success-box').style.animation = 'fadeInDown 0.5s'
          document.querySelector('#sign-up form').reset()
          document.querySelector('#sign-up-bck').style.display = 'none';
        }
      })
    }
    if (document.getElementById('pass').value !== document.getElementById('re-pass').value){
      console.log('test')
      document.getElementById('pass-box').style.display = 'flex';
      document.getElementById('pass-box').style.animation = 'fadeInDown 0.5s'

    }
  }
  
}
