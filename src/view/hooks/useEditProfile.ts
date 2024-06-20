import { useToast } from "@chakra-ui/react";
import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { useState } from "react";
import { uploadDataToCloudStorage } from "src/data/cloudstorage/upload";
import { hasValue } from "src/domain/util/null";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";
import { useAuth } from "src/view/hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

export const useEditProfile = () => {
    const { t } = useAppTranslation();
    const toast = useToast();
    const { user, firebaseUserId } = useAuth();
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
        if (!firebaseUserId) {
            return;
        }

        setIsUpdatingUserProfile(true);
        try {
            await _updateProfile({ firebaseUserId, name, profileImageBlob });
            toast({
                title: t("account:editProfileSuccess"),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (e) {
            toast({
                title: t("account:editProfileFailed"),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsUpdatingUserProfile(false);
        }
    };

    // TODO: redux に移動する
    const _updateProfile = async ({
        firebaseUserId,
        name,
        profileImageBlob,
    }: {
        firebaseUserId: string;
        name?: string;
        profileImageBlob?: Blob;
    }) => {
        // TODO: plannerに更新を通知する
        if (profileImageBlob) {
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                process.env.CLOUD_STORAGE_IMAGE_BUCKET
            );
            console.log(process.env.CLOUD_STORAGE_IMAGE_BUCKET);
            const uniqueFileName = uuidv4() + ".png";
            const storageRef = ref(
                storage,
                `/public/images/profile_pictures/${firebaseUserId}/original/${uniqueFileName}`
            );
            const { downloadUrl } = await uploadDataToCloudStorage(
                profileImageBlob,
                storageRef
            );
            console.log({ downloadUrl });
        }
    };

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
