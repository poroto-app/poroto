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
    const [files, setFiles] = useState<File[]>([]);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploadRequestStatus, setUploadRequestStatus] =
        useState<UploadRequestStatus>(UploadRequestStatus.IDLE);

    const handleFileChange = (selectedFiles: FileList) => {
        const selectedFilesArray = Array.from(selectedFiles);
        setFiles(selectedFilesArray);
        const imageURLsArray = selectedFilesArray.map((file) =>
            URL.createObjectURL(file)
        );
        setImageURLs(imageURLsArray);
    };

    const handleUpload = async () => {
        try {
            setUploadRequestStatus(UploadRequestStatus.PENDING);
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                process.env.CLOUD_STORAGE_POROTO_PLACE_IMAGES
            );

            const uploadTasks = files.map((file) => {
                const storageRef = ref(storage, `images/${file.name}`);
                return uploadBytesResumable(storageRef, file);
            });

            await Promise.all(uploadTasks.map(setupUploadTaskListener));
        } catch (error) {
            setUploadRequestStatus(UploadRequestStatus.REJECTED);
        }
    };

    const setupUploadTaskListener = (uploadTask: UploadTask) => {
        return new Promise<void>((resolve, reject) => {
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
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        setImageURLs((prevImageURLs) => [
                            ...prevImageURLs,
                            downloadURL,
                        ]);
                        setUploadProgress(null);
                        setUploadRequestStatus(UploadRequestStatus.FULFILLED);
                        resolve();
                    } catch (error) {
                        setUploadRequestStatus(UploadRequestStatus.REJECTED);
                        reject(error);
                    }
                }
            );
        });
    };

    return {
        files,
        imageURLs,
        uploadProgress,
        isUploading: uploadRequestStatus === UploadRequestStatus.PENDING,
        isUploadConfirmationDialogVisible: files.length > 0,
        handleFileChange,
        handleUpload,
    };
};

export default useUploadImage;
