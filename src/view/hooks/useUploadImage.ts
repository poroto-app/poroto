import { getApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    UploadTask,
} from "firebase/storage";
import { useState } from "react";

enum UploadRequestStatus {
    IDLE = "IDLE",
    PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED",
}

const useUploadImage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploadRequestStatus, setUploadRequestStatus] =
        useState<UploadRequestStatus>(UploadRequestStatus.IDLE);

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
        setImageURL(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        try {
            setUploadRequestStatus(UploadRequestStatus.PENDING);
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
            setupUploadTaskListener(uploadTask);
        } catch (error) {
            setUploadRequestStatus(UploadRequestStatus.REJECTED);
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
                setUploadRequestStatus(UploadRequestStatus.REJECTED);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    setImageURL(downloadURL);
                    setUploadProgress(null);
                    setUploadRequestStatus(UploadRequestStatus.FULFILLED);
                } catch (error) {
                    setUploadRequestStatus(UploadRequestStatus.REJECTED);
                }
            }
        );
    };

    return {
        file,
        imageURL,
        uploadProgress,
        isUploading: uploadRequestStatus === UploadRequestStatus.PENDING,
        isUploadConfirmationDialogVisible: file !== null,
        handleFileChange,
        handleUpload,
    };
};

export default useUploadImage;
