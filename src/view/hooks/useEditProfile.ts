import { useToast } from "@chakra-ui/react";
import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { useState } from "react";
import { uploadDataToCloudStorage } from "src/data/cloudstorage/upload";
import { hasValue } from "src/domain/util/null";
import { useAuth } from "src/view/hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

export const useEditProfile = () => {
    const toast = useToast();
    const { user, firebaseUserId } = useAuth();
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
        if (!firebaseUserId) {
            return;
        }

        try {
            await _updateProfile({ firebaseUserId, name, profileImageBlob });
        } catch (e) {
            // TODO: i18n 対応する
            toast({
                title: "プロフィールの更新に失敗しました",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // TODO: plannerに更新を通知する
        // TODO: i18n 対応する
        toast({
            title: "プロフィールを更新しました",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
        openEditUserProfileDialog,
        closeEditUserProfileDialog,
        updateProfile,
    };
};
