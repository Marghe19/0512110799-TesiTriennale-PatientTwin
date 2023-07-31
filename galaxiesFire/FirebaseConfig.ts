// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE5jnT7DPw18JRnhEgxb2A07lm1AZJxuY",
    authDomain: "auth-17c4f.firebaseapp.com",
    projectId: "auth-17c4f",
    storageBucket: "auth-17c4f.appspot.com",
    messagingSenderId: "361085237910",
    appId: "1:361085237910:web:1e3646548bd8b9c22920b7",
    measurementId: "G-H55YKJQ7QN"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);