// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA19a5D-F9_bOP4iR7UA283MKdvSskeHcU",
    authDomain: "foodzilla-6c18e.firebaseapp.com",
    projectId: "foodzilla-6c18e",
    storageBucket: "foodzilla-6c18e.appspot.com",
    messagingSenderId: "178090947157",
    appId: "1:178090947157:web:6f926724c7a6871a4e1adc",
    measurementId: "G-9GHFFMZ3Y5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export const db = {
    FoodZilla: 'FoodZilla',

    formatedDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimeStamp: serverTimestamp,
}