import { getApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    UploadTask,
} from "firebase/storage";
import { useState } from "react";

const useUploadImage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadMessage("Please select a file to upload.");
            return;
        }

        try {
            const firebaseApp = getApp();
            const storage = getStorage(firebaseApp, "gs://poroto-place-images");
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask: UploadTask = uploadBytesResumable(
                storageRef,
                file
            );

            setupUploadTaskListener(uploadTask);
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadMessage("File upload failed. Please try again.");
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
                setUploadMessage("File upload failed. Please try again.");
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    setImageURL(downloadURL);
                    setUploadMessage("File uploaded successfully!");
                    setUploadProgress(null);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                    setUploadMessage("File upload failed. Please try again.");
                }
            }
        );
    };

    return {
        file,
        uploadMessage,
        imageURL,
        uploadProgress,
        handleFileChange,
        handleUpload,
    };
};

export default useUploadImage;
