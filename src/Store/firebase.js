import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDONqP-9cwlYDLEgJLydeDQpBfKXmw8tf0",
  authDomain: "autos-c1792.firebaseapp.com",
  projectId: "autos-c1792",
  storageBucket: "autos-c1792.appspot.com",
  messagingSenderId: "271618970573",
  appId: "1:271618970573:web:ec23eec17438142989aa84",
  measurementId: "G-5N73RPSZXP"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;