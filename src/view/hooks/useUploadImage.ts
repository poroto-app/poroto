import { getApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    UploadTask,
} from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

enum UploadRequestStatus {
    IDLE = "IDLE",
    PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED",
}

const useUploadImage = () => {
    const [localFiles, setLocalFiles] = useState<File[]>([]);
    const [localImageURLs, setLocalImageURLs] = useState<string[]>([]);
    const [uploadedImageURLs, setUploadedImageURLs] = useState<string[]>([]);
    const [uploadRequestStatus, setUploadRequestStatus] =
        useState<UploadRequestStatus>(UploadRequestStatus.IDLE);

    const handleFileChange = (selectedFiles: FileList) => {
        const selectedFilesArray = Array.from(selectedFiles);
        setLocalFiles(selectedFilesArray);
        const imageURLsArray = selectedFilesArray.map((file) =>
            URL.createObjectURL(file)
        );
        setLocalImageURLs(imageURLsArray);
    };

    const handleUpload = async () => {
        try {
            setUploadRequestStatus(UploadRequestStatus.PENDING);
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                process.env.CLOUD_STORAGE_POROTO_PLACE_IMAGES
            );

            const uploadTasks = localFiles.map((file) => {
                const uniqueFileName = `${uuidv4()}_${file.name}`;
                const storageRef = ref(storage, `images/${uniqueFileName}`);
                return uploadBytesResumable(storageRef, file);
            });

            await Promise.all(uploadTasks.map(setupUploadTaskListener));
            setUploadRequestStatus(UploadRequestStatus.FULFILLED);
        } catch (error) {
            setUploadRequestStatus(UploadRequestStatus.REJECTED);
        }
    };

    const setupUploadTaskListener = (uploadTask: UploadTask) => {
        return new Promise<void>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        setUploadedImageURLs((prevImageURLs) => [
                            ...prevImageURLs,
                            downloadURL,
                        ]);
                        setUploadRequestStatus(UploadRequestStatus.FULFILLED);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    };

    return {
        localFiles,
        localImageURLs,
        uploadedImageURLs,
        isUploading: uploadRequestStatus === UploadRequestStatus.PENDING,
        isUploadConfirmationDialogVisible: localFiles.length > 0,
        handleFileChange,
        handleUpload,
    };
};

export default useUploadImage;
