import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { hasValue } from "src/domain/util/null";
import { reduxAuthSelector } from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";
import { setIsBindPreLoginStateDialogVisible } from "src/redux/user";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, firebaseUserId, firebaseIdToken } = reduxAuthSelector();
    const [isLoggedInUser, setIsLoggedInUser] = useState(
        hasValue(firebaseIdToken)
    );

    useEffect(() => {
        setIsLoggedInUser(getLoggedIn() || hasValue(firebaseIdToken));
    }, [firebaseIdToken]);

    const signInWithGoogle = () => {
        const auth = getAuth();
        _signInWithGoogle(auth).then(() => {
            // ログイン後に、ログイン前のデータを引き継ぐかを尋ねるダイアログを表示する
            dispatch(setIsBindPreLoginStateDialogVisible({ visible: true }));
        });
    };

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then();
    };

    return {
        user,
        firebaseUserId,
        isLoggedInUser,
        signInWithGoogle,
        logout,
        setLoggedIn,
    };
};

const setLoggedIn = (loggedIn: boolean) => {
    localStorage.setItem(LocalStorageKeys.LoggedIn, loggedIn.toString());
};

const getLoggedIn = (): boolean => {
    return localStorage.getItem(LocalStorageKeys.LoggedIn) === true.toString();
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
