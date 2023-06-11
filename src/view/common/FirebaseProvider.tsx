import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "@firebase/analytics";

export const FirebaseProvider = () => {
    const app = initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    });

    isSupported().then((supported) => {
        if (supported) getAnalytics(app);
    });

    return <></>;
};
