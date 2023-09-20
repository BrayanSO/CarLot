import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
console.log("VAMOS 2");
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDAUfezZgBpDLaFKU5ETa7odhf9mo3ZSqk",
    authDomain: "carlot-b279b.firebaseapp.com",
    projectId: "carlot-b279b",
    storageBucket: "carlot-b279b.appspot.com",
    messagingSenderId: "1021480257076",
    appId: "1:1021480257076:web:b08d62bfd4947974412c61",
    measurementId: "G-T1K3JKKFL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
