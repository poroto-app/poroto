import {initializeApp} from "firebase/app";
import {firebaseConfig} from "src/secrets/firebaseConfig";
import {getAnalytics, isSupported} from "@firebase/analytics";

export const FirebaseProvider = () => {
    const app = initializeApp(firebaseConfig);

    isSupported().then((supported) => {
        if(supported) getAnalytics(app);
    })

    return <></>
}
