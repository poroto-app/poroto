import { useToast } from "@chakra-ui/react";
import { getApp } from "firebase/app";
import {
getDownloadURL,
getStorage,
ref,
uploadBytesResumable,
UploadTask
} from "firebase/storage";
import { useState } from "react";
import { uploadPlacePhotosInPlan } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
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
    const toast = useToast();
    const dispatch = useAppDispatch();
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleFileChange = (selectedFiles: FileList) => {
        const selectedFilesArray = Array.from(selectedFiles);
        setLocalFiles(selectedFilesArray);
        const imageURLsArray = selectedFilesArray.map((file) =>
            URL.createObjectURL(file)
        );
        setLocalImageURLs(imageURLsArray);
    };

    const handleUpload = async ({
        planId,
        userId,
        placeId,
    }: {
        planId: string;
        userId: string;
        placeId: string;
    }) => {
        try {
            setUploadRequestStatus(UploadRequestStatus.PENDING);

            // 画像のサイズを取得する
            const localFilesWithSize = await Promise.all(
                localFiles.map(async (file) => {
                    const size = await fetchImageSizeFromFile(file);
                    return { size, file };
                })
            );

            // Cloud Storageに画像をアップロードする
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                process.env.CLOUD_STORAGE_POROTO_PLACE_IMAGES
            );

            const nonUploadedlocalFiles = localFiles.filter(
                (file, index) =>
                    !uploadedImageURLs.includes(localImageURLs[index])
            );

            if (nonUploadedlocalFiles.length === 0) {
                toast({
                    title: "すべての画像が既にアップロードされています",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const uploadTasks = nonUploadedlocalFiles.map((file, index) => {
                const uniqueFileName = `${uuidv4()}_${file.name}`;
                const storageRef = ref(storage, `images/${uniqueFileName}`);
                return setupUploadTaskListener(
                    index,
                    uploadBytesResumable(storageRef, file)
                );
            });

            const uploadTaskResults = await Promise.all(uploadTasks);
            const uploadedFileDownloadUrls = uploadTaskResults.map(
                (result) => result.downloadUrl
            );
            setUploadedImageURLs(uploadedFileDownloadUrls);

            // plannerに画像を登録する
            const photos = localFilesWithSize.map((fileWithSize, index) => {
                const uploadTaskResultOfFile = uploadTaskResults.find(
                    (result) => result.taskIndex === index
                );
                if (!uploadTaskResultOfFile) {
                    throw new Error("downloadUrl not found");
                }

                return {
                    userId,
                    placeId,
                    photoUrl: uploadTaskResultOfFile.downloadUrl,
                    width: fileWithSize.size.width,
                    height: fileWithSize.size.height,
                };
            });
            dispatch(uploadPlacePhotosInPlan({ planId, photos: photos }));

            toast({
                title: "画像のアップロードが完了しました",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setUploadRequestStatus(UploadRequestStatus.FULFILLED);
        } catch (error) {
            toast({
                title: "画像のアップロードに失敗しました",
                description: "もう一度試してみてください。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setUploadRequestStatus(UploadRequestStatus.REJECTED);
        }
    };

    const setupUploadTaskListener = (
        taskIndex: number,
        uploadTask: UploadTask
    ): Promise<{ taskIndex?: number; downloadUrl: string }> => {
        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                () => {
                    // アップロードの進捗が変化した場合の処理
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const downloadUrl = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        setUploadRequestStatus(UploadRequestStatus.FULFILLED);
                        resolve({ taskIndex, downloadUrl });
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
        dialogVisible,
        setDialogVisible,
    };
};

// 画像の高さと横幅を取得する
function fetchImageSizeFromFile(
    file: File
): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
            const size = {
                width: image.naturalWidth,
                height: image.naturalHeight,
            };
            URL.revokeObjectURL(image.src);
            resolve(size);
        };

        image.onerror = (error) => {
            reject(error);
        };

        image.src = URL.createObjectURL(file);
    });
}

export default useUploadImage;
