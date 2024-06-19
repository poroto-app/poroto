import { useState } from "react";

export const useEditProfile = () => {
    const [isEditUserProfileDialogVisible, setIsEditUserProfileDialogVisible] =
        useState(false);

    const openEditUserProfileDialog = () => {
        setIsEditUserProfileDialogVisible(true);
    };

    const closeEditUserProfileDialog = () => {
        setIsEditUserProfileDialogVisible(false);
    };

    return {
        isEditUserProfileDialogVisible,
        openEditUserProfileDialog,
        closeEditUserProfileDialog,
    };
};
