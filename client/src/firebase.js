// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a0e0e.firebaseapp.com",
  projectId: "mern-auth-a0e0e",
  storageBucket: "mern-auth-a0e0e.firebasestorage.app",
  messagingSenderId: "115874458868",
  appId: "1:115874458868:web:e86275ef049810c01c82a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);