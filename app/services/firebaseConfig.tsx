// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs, updateDoc, doc, deleteDoc   } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCns8835cyMPJTl-k7jCRbbIg-Xluxovg4",
  authDomain: "loja-pf-9b84d.firebaseapp.com",
  projectId: "loja-pf-9b84d",
  storageBucket: "loja-pf-9b84d.appspot.com",
  messagingSenderId: "1032391464771",
  appId: "1:1032391464771:web:881df5afa2dc20323501f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, db, getFirestore,collection, addDoc, getDocs, updateDoc, doc, deleteDoc }