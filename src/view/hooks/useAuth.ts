import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "@firebase/auth";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchByFirebaseUser,
    reduxAuthSelector,
    resetAuthUser,
} from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, fetchByFirebaseUserStatus } = reduxAuthSelector();

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const idToken = await firebaseUser.getIdToken();
                if (fetchByFirebaseUserStatus !== RequestStatuses.PENDING)
                    dispatch(
                        fetchByFirebaseUser({
                            firebaseUserId: firebaseUser.uid,
                            firebaseToken: idToken,
                        })
                    );
            } else {
                dispatch(resetAuthUser());
            }
        });
    }, []);

    const signInWithGoogle = () => {
        const auth = getAuth();
        _signInWithGoogle(auth).then();
    };

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then();
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
    const idToken = await result.user.getIdToken();
    return {
        idToken,
        user: result.user,
    };
};
