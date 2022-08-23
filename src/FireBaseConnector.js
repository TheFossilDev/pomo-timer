// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwVLTwfIApxbzpbEg0-fVdSsu8p-gCcXk",
  authDomain: "pomodorio-backend.firebaseapp.com",
  projectId: "pomodorio-backend",
  storageBucket: "pomodorio-backend.appspot.com",
  messagingSenderId: "827293182697",
  appId: "1:827293182697:web:a74697815d297eb4cdde78",
  measurementId: "G-5JQT4THY4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase
export { app as fireBaseApp, analytics as fireBaseAnalytics };