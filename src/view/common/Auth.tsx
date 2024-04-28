import { getAuth } from "@firebase/auth";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    fetchByFirebaseUser,
    reduxAuthSelector,
    resetAuthUser,
} from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";

export function Auth() {
    const dispatch = useAppDispatch();
    const { fetchByFirebaseUserStatus } = reduxAuthSelector();

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

    return <></>;
}
