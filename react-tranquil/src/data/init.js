import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAqBe5oDIOgPuWMx1cpwdfnvFIBDksJJ0o",
    authDomain: "piw-2024-ab53b.firebaseapp.com",
    projectId: "piw-2024-ab53b",
    storageBucket: "piw-2024-ab53b.appspot.com",
    messagingSenderId: "137543906868",
    appId: "1:137543906868:web:b2b7b36c96370ab856bc61",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);