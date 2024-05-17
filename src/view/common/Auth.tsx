import { getAuth } from "@firebase/auth";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import {
    fetchByFirebaseUser,
    reduxAuthSelector,
    resetAuthUser,
} from "src/redux/auth";
import { useAppDispatch } from "src/redux/redux";
import { useAuth } from "src/view/hooks/useAuth";

export function Auth() {
    const dispatch = useAppDispatch();
    const { fetchByFirebaseUserStatus } = reduxAuthSelector();
    const { setLoggedIn } = useAuth();

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(async (firebaseUser) => {
            setLoggedIn(hasValue(firebaseUser));

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
