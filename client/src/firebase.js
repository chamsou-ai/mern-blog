// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-508dc.firebaseapp.com",
  projectId: "mern-blog-508dc",
  storageBucket: "mern-blog-508dc.appspot.com",
  messagingSenderId: "1048550419072",
  appId: "1:1048550419072:web:a95705dc71c1f5cfb1d465"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);