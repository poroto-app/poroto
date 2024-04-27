import { getAuth } from "@firebase/auth";
import { useEffect } from "react";
import { AuthApi } from "src/data/auth/AuthApi";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchByFirebaseUser,
    reduxAuthSelector,
    resetAuthUser,
} from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";

// ログイン状態を監視するコンポーネント
export function Auth() {
    const dispatch = useAppDispatch();
    const { fetchByFirebaseUserStatus } = reduxAuthSelector();
    const authApi = new AuthApi();

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

                authApi.sessionLogin({ idToken }).then().catch();
            } else {
                dispatch(resetAuthUser());
                authApi.sessionLogout().then().catch();
            }
        });
    }, []);

    return <></>;
}
