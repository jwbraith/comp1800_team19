

(function() {
    const db = firebase.firestore();
    const textEmail = document.getElementById("textEmail");
    const textPassword = document.getElementById("textPassword");
    const loginButton = document.getElementById("login-btn");
    const signupButton = document.getElementById("signup-btn");

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

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log(user);
            loginButton.classList.add('hide');
            signupButton.classList.add('hide');
            textPassword.classList.add('hide');
            textEmail.classList.add('hide');

            db.collection("users").doc(user.uid).set({
                email: textEmail.value,
                score: 0
            })

            setTimeout(function() {
                window.location.href = "profile.html"
            }, 500)
        } else {
            console.log('not logged in')

        }
    })

}())

