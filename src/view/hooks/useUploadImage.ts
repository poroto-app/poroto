import { getApp } from "firebase/app";
import {
getDownloadURL,
getStorage,
ref,
uploadBytesResumable,
UploadTask
} from "firebase/storage";
import { useState } from "react";

const useUploadImage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
        setImageURL(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        try {
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                process.env.CLOUD_STORAGE_POROTO_PLACE_IMAGES
            );
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask: UploadTask = uploadBytesResumable(
                storageRef,
                file
            );

            setIsUploading(true);
            setupUploadTaskListener(uploadTask);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const setupUploadTaskListener = (uploadTask: UploadTask) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
                setIsUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    setImageURL(downloadURL);
                    setUploadProgress(null);
                    setIsUploading(false);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                    setIsUploading(false);
                }
            }
        );
    };

    const isUploadConfirmationDialogVisible = file !== null;

    return {
        file,
        imageURL,
        uploadProgress,
        isUploading,
        isUploadConfirmationDialogVisible,
        handleFileChange,
        handleUpload,
    };
};

export default useUploadImage;
