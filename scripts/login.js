

(function() {
    
    const textEmail = document.getElementById("textEmail");
    const textPassword = document.getElementById("textPassword");
    const loginButton = document.getElementById("login-btn");
    const signupButton = document.getElementById("signup-btn");
    const logoutButton = document.getElementById("logout-btn");

    loginButton.addEventListener('click', e => {
        const email = textEmail.value;
        const pass = textPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);

        promise.catch(e => console.log(e.message));
    });


    signupButton.addEventListener('click', e => {
        const email = textEmail.value;
        const pass = textPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass)

        promise.catch(e => console.log(e.message));
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            logoutButton.classList.remove('hide');
            loginButton.classList.add('hide');
            signupButton.classList.add('hide');
            textPassword.classList.add('hide');
            textEmail.classList.add('hide');
            window.location.href = "main.html"
        } else {
            console.log('not logged in')
            logoutButton.classList.remove('hide');
        }
    })

}())