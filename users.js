
export const checkLS = (displayUserName) =>{
    if(localStorage.getItem('user') === ''){
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
          //modal za create acc
        }
      })
      .catch(function(error) {
        console.log("Error getting document: ", error);
      });

};

export const signOutUser = (displayUserName)=>{
    if (displayUserName.textContent !== 'Log in'){
        displayUserName.textContent = 'Log in';
        localStorage.setItem('user', '');        
    }
}

