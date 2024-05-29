import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
// export const firestore = getFirestore(app);
export const firestore = getFirestore();
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
export const storage = getStorage(app);
