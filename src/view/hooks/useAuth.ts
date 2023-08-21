import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { User } from "src/domain/models/User";

export const useAuth = () => {
    const [user, setUser] = useState<User>(null);
    const auth = getAuth();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    id: user.uid,
                    name: user.displayName,
                    avatarImage: user.photoURL,
                });
            } else {
                setUser(null);
            }
        });
    }, []);

    const signInWithGoogle = () => {
        _signInWithGoogle(auth).then(({ user }) => {
            setUser({
                id: user.uid,
                name: user.displayName,
                avatarImage: user.photoURL,
            });
        });
    };

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
        });
    };

    return { user, signInWithGoogle, logout };
};

const _signInWithGoogle = async (auth: Auth) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential === null) {
        throw new Error("credential is null");
    }
    const token = credential.accessToken;
    const user = result.user;
    return { token, user };
};
