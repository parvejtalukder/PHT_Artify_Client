// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmAVKZWb_p9Ki1aFF9KNzY6FCxzj7VSLs",
  authDomain: "artify-cb7eb.firebaseapp.com",
  projectId: "artify-cb7eb",
  storageBucket: "artify-cb7eb.firebasestorage.app",
  messagingSenderId: "776807970252",
  appId: "1:776807970252:web:ab7c07e3f6aa70b9195969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);