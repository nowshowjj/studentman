 (function () {
   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyB44qYo-Ez3UZ_Qap-104VoWIVkjWXKmmU",
    authDomain: "communicated-d1953.firebaseapp.com",
    databaseURL: "https://communicated-d1953.firebaseio.com",
    projectId: "communicated-d1953",
    storageBucket: "communicated-d1953.appspot.com",
    messagingSenderId: "364110602722"
  };
   firebase.initializeApp(config);

   //Get elements
   const txtEmail = document.getElementById('txtEmail');
   const txtPassword = document.getElementById('txtPassword');
   const btnLogin = document.getElementById('btnLogin');
   const btnSignUp = document.getElementById('btnSignUp');
   const btnLogout = document.getElementById('btnLogout');

   //Add login event
   if(btnLogin)
   btnLogin.addEventListener('click', e => {
     e.preventDefault();
     //Get email and pass
     const email = txtEmail.value;
     const pass = txtPassword.value;
     const auth = firebase.auth();

     // sign in
     const promise = auth.signInWithEmailAndPassword(email, pass);
     promise.catch(e => console.log(e.message));
     promise.then(function(e){
      document.location.href = "students.html";

     });
   });
   //Add signup event
   if(btnSignUp)
   btnSignUp.addEventListener('click', e => {
     e.preventDefault();
     //Get email and pass
     //ToDo check for real emails
     const email = txtEmail.value;
     const pass = txtPassword.value;
     const auth = firebase.auth();
     // sign in
     const promise = auth.createUserWithEmailAndPassword(email, pass);
     promise
       .catch(e => console.log(e.message));
   });

  if(btnLogout)
   btnLogout.addEventListener('click', e => {
    console.log("logout callback")
     e.preventDefault();
     var promise = firebase.auth().signOut();
     promise.then(function(){
        window.location.href = "first.html";
     });

   });

   // Add realtime listener
   firebase.auth().onAuthStateChanged(firebaseUser => {
     if (firebaseUser) {
      //document.location.href = "index.html";
       console.log(firebaseUser);
       //btnLogout.classList.remove('hide');
     } else {
       console.log('not logged in');
       //btnLogout.classList.add('hide');
       //window.location.href = "login.html";
     }

   });
 }());
