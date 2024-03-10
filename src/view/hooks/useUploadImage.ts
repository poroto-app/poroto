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
    const [imageURL, setImageURL] = useState<string>("");
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [isUpload, setIsUpload] = useState<boolean>(false);

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
        setImageURL(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        try {
            const firebaseApp = getApp();
            const storage = getStorage(firebaseApp, "gs://poroto-place-images");
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask: UploadTask = uploadBytesResumable(
                storageRef,
                file
            );

            setIsUpload(true);
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
                setIsUpload(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    setImageURL(downloadURL);
                    setUploadProgress(null);
                    setIsUpload(false);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                    setIsUpload(false);
                }
            }
        );
    };

    return {
        file,
        imageURL,
        uploadProgress,
        isUpload,
        handleFileChange,
        handleUpload,
    };
};

export default useUploadImage;
