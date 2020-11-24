const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener('click', e => {
    firebase.auth().signOut();
})