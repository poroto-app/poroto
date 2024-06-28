import { useToast } from "@chakra-ui/react";
import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { uploadDataToCloudStorage } from "src/data/cloudstorage/upload";
import { getFileExtension } from "src/domain/util/file";
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

type PlaceImageFile = {
    placeId: string;
    file: File;
};

export type UploadPlaceImageProps = {
    localPlaceImageFiles: PlaceImageFile[];
    localPlaceImageUrls: string[];
    isUploading: boolean;
    isUploadPlacePhotoDialogVisible: boolean;
    canUpload: boolean;
    onFileChanged: (params: { placeId: string; files: FileList }) => void;
    onUpload: () => void;
    onCloseDialog: () => void;
};

const useUploadPlaceImage = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const { t } = useTranslation();

    const [localPlaceImageFiles, setLocalPlaceImageFiles] = useState<
        PlaceImageFile[]
    >([]);
    const [uploadRequestStatus, setUploadRequestStatus] =
        useState<UploadRequestStatus>(UploadRequestStatus.IDLE);

    const { user, firebaseIdToken } = reduxAuthSelector();
    const { preview } = reduxPlanSelector();

    const handleFileChange = ({
        placeId,
        files,
    }: {
        placeId: string;
        files: FileList;
    }) => {
        const selectedFilesArray = Array.from(files);
        setLocalPlaceImageFiles(
            selectedFilesArray.map((file) => ({ placeId, file }))
        );
    };

    const handleUpload = async () => {
        if (!user || !firebaseIdToken || !preview) {
            return;
        }

        try {
            setUploadRequestStatus(UploadRequestStatus.PENDING);

            // 画像のサイズを取得する
            const localFilesWithSize = await Promise.all(
                localPlaceImageFiles.map(async ({ file, placeId }) => {
                    const size = await fetchImageSizeFromFile(file);
                    return { size, file, placeId };
                })
            );
            // Cloud Storageに画像をアップロードする
            const firebaseApp = getApp();
            const storage = getStorage(
                firebaseApp,
                process.env.CLOUD_STORAGE_POROTO_PLACE_IMAGES
            );

            const uploadTasks = localFilesWithSize.map(
                async ({ file, size, placeId }) => {
                    let uniqueFileName = uuidv4();

                    // ファイル名が日本語の場合は downloadUrl が長くなってしまうため、拡張子だけ取得する
                    const fileExtension = getFileExtension(file.name);
                    if (fileExtension) {
                        uniqueFileName += `.${fileExtension}`;
                    }

                    const storageRef = ref(storage, `images/${uniqueFileName}`);
                    const { downloadUrl } = await uploadDataToCloudStorage(
                        file,
                        storageRef
                    );
                    return { downloadUrl, size, placeId };
                }
            );
            const uploadTaskResults = await Promise.all(uploadTasks);

            // plannerに画像を登録する
            const photos = uploadTaskResults.map(
                ({ downloadUrl, size, placeId }) => {
                    return {
                        userId: user.id,
                        placeId,
                        photoUrl: downloadUrl,
                        width: size.width,
                        height: size.height,
                    };
                }
            );

            dispatch(
                uploadPlacePhotosInPlan({
                    planId: preview.id,
                    userId: user.id,
                    firebaseIdToken,
                    photos: photos,
                })
            );

            toast({
                title: t("place:uploadPlacePhotoSuccess"),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setLocalPlaceImageFiles([]);
            setUploadRequestStatus(UploadRequestStatus.FULFILLED);
        } catch (error) {
            toast({
                title: t("place:uploadPlacePhotoFailed"),
                description: t("place:uploadPlacePhotoFailedDescription"),
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setLocalPlaceImageFiles([]);
            setUploadRequestStatus(UploadRequestStatus.REJECTED);
        }
    };

    const handleOnCloseDialog = () => {
        setLocalPlaceImageFiles([]);
    };

    return {
        localPlaceImageFiles: localPlaceImageFiles,
        localPlaceImageUrls: localPlaceImageFiles.map(({ file }) =>
            URL.createObjectURL(file)
        ),
        isUploading: uploadRequestStatus === UploadRequestStatus.PENDING,
        isUploadPlacePhotoDialogVisible: localPlaceImageFiles.length > 0,
        canUpload: !!user,
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

export default useUploadPlaceImage;
