import { useToast } from "@chakra-ui/react";
import { getApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    StorageReference,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { reduxAuthSelector } from "src/redux/auth";
import { reduxPlanSelector, uploadPlacePhotosInPlan } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { v4 as uuidv4 } from "uuid";

enum UploadRequestStatus {
    IDLE = "IDLE",
    PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED",
}

export type UploadPlaceImageProps = {
    localFiles: File[];
    isUploading: boolean;
    isUploadPlacePhotoDialogVisible: boolean;
    onFileChanged: (files: FileList) => void;
    onUpload: ({ placeId }: { placeId: string }) => void;
    onCloseDialog: () => void;
};

const useUploadPlaceImage = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();

    const [localFiles, setLocalFiles] = useState<File[]>([]);
    const [uploadRequestStatus, setUploadRequestStatus] =
        useState<UploadRequestStatus>(UploadRequestStatus.IDLE);

    const { user } = reduxAuthSelector();
    const { preview } = reduxPlanSelector();

    const handleFileChange = (selectedFiles: FileList) => {
        const selectedFilesArray = Array.from(selectedFiles);
        setLocalFiles(selectedFilesArray);
    };

    const handleUpload = async ({ placeId }: { placeId: string }) => {
        if (!user || !preview) {
            return;
        }

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

            const uploadTasks = localFilesWithSize.map(
                async ({ file, size }) => {
                    const uniqueFileName = `${uuidv4()}_${file.name}`;
                    const storageRef = ref(storage, `images/${uniqueFileName}`);
                    const { downloadUrl } = await uploadFile(file, storageRef);
                    return { downloadUrl, size };
                }
            );
            const uploadTaskResults = await Promise.all(uploadTasks);

            // plannerに画像を登録する
            const photos = uploadTaskResults.map(({ downloadUrl, size }) => {
                return {
                    userId: user.id,
                    placeId,
                    photoUrl: downloadUrl,
                    width: size.width,
                    height: size.height,
                };
            });
            dispatch(
                uploadPlacePhotosInPlan({ planId: preview.id, photos: photos })
            );

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

    const handleOnCloseDialog = () => {
        setLocalFiles([]);
    };

    return {
        localFiles,
        isUploading: uploadRequestStatus === UploadRequestStatus.PENDING,
        isUploadPlacePhotoDialogVisible: localFiles.length > 0,
        onUpload: handleUpload,
        onFileChanged: handleFileChange,
        onCloseDialog: handleOnCloseDialog,
    } as UploadPlaceImageProps;
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

const uploadFile = (
    file: File,
    storageRef: StorageReference
): Promise<{ downloadUrl: string }> => {
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    resolve({ downloadUrl });
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

export default useUploadPlaceImage;
