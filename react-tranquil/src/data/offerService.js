import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, firestore } from "./init";

export const addOffer = async (offer) => {
    console.log(offer);
    
    const tempOffer = {
        name: offer.name || "NOT_PROVIDED",
        location: offer.location || "NOT_PROVIDED",
        description: offer.description || "NOT_PROVIDED",
        stars: offer.stars || 0,
        price: offer.price || 0,
        userId: auth?.currentUser.uid,
        created: serverTimestamp(),
    };

    const offerCollection = collection(firestore, "offers");
    const docRef = await addDoc(offerCollection, tempOffer);
    console.log(tempOffer);
};

export const readMyOffers = async () => {
    const offers = [];

    const offerCollection = collection(firestore, "offers");
    const user = auth?.currentUser;

    // console.log("userId: " + user.uid);

    if (!user) {
        return offers;
    }

    const q = query(offerCollection, where("userId", "==", user.uid));
    const results = await getDocs(q);

    results.forEach((doc) => {
        offers.push({ id: doc.id, ...doc.data() });
    });

    return offers;
}

export const readOfferById = async (id) => {
    const offerCollection = collection(firestore, "offers");
    const q = query(offerCollection, where("userId", "===", id));
    const result = await getDocs(q);
    
    if (result.size === 1)
    {
        result.forEach((doc) => {
            return {id: doc.id, ...doc.data()};
        })
    }
}
    
export const readOffers = async () => {
    const offers = [];

    const offerCollection = collection(firestore, "offers");
    const user = auth?.currentUser;


    const q = query(offerCollection);
    const results = await getDocs(q);

    results.forEach((doc) => {
        offers.push({ id: doc.id, ...doc.data() });
    });

    return offers;
};

// TODO - add offer owner check
export const updateOffer = async (offerId, updatedOffer) => {
    const offerDocRef = doc(firestore, "offers", offerId);
    try {
        await updateDoc(offerDocRef, updatedOffer);
        console.log("Offer updated:", offerId);
    } catch (error) {
        console.error("Error updating offer:", error);
    }
};

export const deleteOffer = async (offerId) => {
    const offerDocRef = doc(firestore, "offers", offerId);
    try {
        await deleteDoc(offerDocRef);
        console.log("Offer deleted:", offerId);
    } catch (error) {
        console.error("Error updating offer:", error);
    }
};
