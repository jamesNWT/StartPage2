// import { getAuth } from "firebase/auth";

auth.onAuthStateChanged(user => {
    if (user != null) {
        console.log("User signed in: ", user);
    } else {
        console.log("User logged out.");
    }
})

async function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
    })
}

async function signOut() {
    auth.signOut()
}