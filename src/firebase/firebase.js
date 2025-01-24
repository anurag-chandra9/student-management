// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABciKS6JYAP61TnsD0mFIQCCDLLsmgyVI",
  authDomain: "student-c7b6e.firebaseapp.com",
  projectId: "student-c7b6e",
  storageBucket: "student-c7b6e.firebasestorage.app",
  messagingSenderId: "490525126632",
  appId: "1:490525126632:web:6f9e7f91c4270d03107e5d",
  measurementId: "G-DMXR55WBME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const firestore=getFirestore(app);

export {app, auth,analytics };