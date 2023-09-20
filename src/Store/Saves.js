 import { collection, addDoc } from "firebase/firestore"; 
console.log("VAMOOOS SAVE");
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e); 
}



