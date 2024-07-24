import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useAuth } from "src/hooks/useAuth";
import { useAppDispatch } from "src/redux/redux";
import {
    reduxUserSelector,
    setUpdateProfileRequestStatus,
    updateUserProfile as updateUserProfileAction,
} from "src/redux/user";

export const useEditProfile = () => {
    const { t } = useAppTranslation();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const { user, firebaseUserId, firebaseIdToken } = useAuth();
    const { updateProfileRequestStatus } = reduxUserSelector();
    const [isUpdatingUserProfile, setIsUpdatingUserProfile] = useState(false);
    const [isEditUserProfileDialogVisible, setIsEditUserProfileDialogVisible] =
        useState(false);

    const openEditUserProfileDialog = () => {
        setIsEditUserProfileDialogVisible(true);
    };

    const closeEditUserProfileDialog = () => {
        setIsEditUserProfileDialogVisible(false);
    };

    const updateProfile = async ({
        name,
        profileImageBlob,
    }: {
        name?: string;
        profileImageBlob?: Blob;
    }) => {
        setIsUpdatingUserProfile(false);
        if (!firebaseUserId || !firebaseIdToken || !user) {
            return;
        }

        setIsUpdatingUserProfile(true);
        dispatch(
            updateUserProfileAction({
                userId: user.id,
                firebaseUserId: firebaseUserId,
                firebaseAuthToken: firebaseIdToken,
                name,
                profileImageBlob,
            })
        );
    };

    useEffect(() => {
        return () => {
            setUpdateProfileRequestStatus({ status: null });
        };
    }, []);

    useEffect(() => {
        if (updateProfileRequestStatus === RequestStatuses.FULFILLED) {
            closeEditUserProfileDialog();
            toast({
                title: t("account:editProfileSuccess"),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else if (updateProfileRequestStatus === RequestStatuses.REJECTED) {
            toast({
                title: t("account:editProfileFailed"),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [updateProfileRequestStatus]);

    return {
        isEditUserProfileDialogVisible:
            isEditUserProfileDialogVisible &&
            hasValue(user) &&
            hasValue(firebaseUserId),
        isUpdatingUserProfile,
        openEditUserProfileDialog,
        closeEditUserProfileDialog,
        updateProfile,
    };
};
