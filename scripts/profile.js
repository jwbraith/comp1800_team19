const nameButton = document.getElementById("name-button");

window.onload = function (){
    firebase.auth().onAuthStateChanged(function(user){
        let nameDisplay = document.getElementById("name-display").innerText = user.displayName;
    }) 
}

function getName() {
    
    let x = document.getElementById("my-form").elements[0].value;

    console.log(x)
    updateUserProfileAuth(x)
    firebase.auth().onAuthStateChanged(function(user){
        
    }) 
    
}

function updateUserProfileAuth(name) {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("user is signed in: " + user.uid);
        console.log("old display name: " + user.displayName);
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("updated authenticated user profile");
            console.log("new display name: " + user.displayName);
            let nameDisplay = document.getElementById("name-display").innerText = user.displayName;
        }).catch(function (error) {
            console.log("authenticated user profile update failed");
        })
        
    })
    
}
