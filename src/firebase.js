import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD4eKvpeZxqrNaPVd-pFoJp35YcbEfuYcs",
    authDomain: "smpn1-bergas-3e6b1.firebaseapp.com",
    projectId: "smpn1-bergas-3e6b1",
    storageBucket: "smpn1-bergas-3e6b1.appspot.com",
    messagingSenderId: "1018715438286",
    appId: "1:1018715438286:web:924f39c2db6cf76339649f",
    measurementId: "G-7N20E85RPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };
