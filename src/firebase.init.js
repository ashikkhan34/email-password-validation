// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPEAXuIJKK-gVIZOlshZXYX-6gu_t8caw",
  authDomain: "from-validation-9776b.firebaseapp.com",
  projectId: "from-validation-9776b",
  storageBucket: "from-validation-9776b.firebasestorage.app",
  messagingSenderId: "984744235134",
  appId: "1:984744235134:web:1f71cf6d88bac8dc18c82f",
  measurementId: "G-JPNNELJ47C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);