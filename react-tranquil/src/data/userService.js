import {
    EmailAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./init";
import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();

export const registerEmail = async (navigate, input) => {
    console.log("registered");
    const userCredentials = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
    );
};

export const loginGoogle = async (navigate) => {
    const userCredentials = await signInWithPopup(auth, googleProvider);
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
