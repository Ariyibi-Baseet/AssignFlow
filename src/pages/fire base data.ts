// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFWo7bFSdrL5sHOjdin0611tEzQRtr4KU",
  authDomain: "assignflow-915ce.firebaseapp.com",
  projectId: "assignflow-915ce",
  storageBucket: "assignflow-915ce.firebasestorage.app",
  messagingSenderId: "673508218517",
  appId: "1:673508218517:web:eb1cf7baaca2d4510e2d9c",
  measurementId: "G-TJLKT4KJ1E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
