import {
    EmailAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth, firestore } from "./init";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();

export const registerEmail = async (navigate, input) => {
    console.log("registered");
    const userCredentials = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
    );
    await addDoc(collection(firestore, "users"), {
        displayName: userCredentials.user.displayName,
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
    });
};

export const loginGoogle = async (navigate) => {
    const userCredentials = await signInWithPopup(auth, googleProvider);
    const q = query(
        collection(firestore, "users"),
        where("uid", "==", userCredentials.user.uid)
    );
    const results = await getDocs(q);
    if (results.empty) {
        await addDoc(collection(firestore, "users"), {
            displayName: userCredentials.user.displayName,
            email: userCredentials.user.email,
            uid: userCredentials.user.uid,
        });
    }

    if (userCredentials.user) navigate("/");
};

export const loginEmail = async (navigate) => {
    const userCredentials = await signInWithPopup(auth, emailProvider);
    if (userCredentials.user) navigate("/");
};

export const logout = async () => {
    signOut(auth);
};

export const useUser = () => {
    const [user, setUser] = useState(auth?.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged((u) => setUser(u));
    }, []);

    return user;
};
