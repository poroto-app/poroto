import {
    getDownloadURL,
    StorageReference,
    StringFormat,
    uploadBytesResumable,
    uploadString,
    UploadTask,
} from "firebase/storage";

export async function uploadDataToCloudStorage(
    data: Blob | Uint8Array | ArrayBuffer,
    storageRef: StorageReference
): Promise<{ downloadUrl: string }> {
    const uploadTask = uploadBytesResumable(storageRef, data);
    return upload(uploadTask, storageRef);
}

export async function uploadStringToCloudStorage({
    data,
    format,
    storageRef,
}: {
    data: string;
    format: StringFormat;
    storageRef: StorageReference;
}): Promise<{ downloadUrl: string }> {
    const { metadata, ref } = await uploadString(storageRef, data, format);
    const downloadUrl = await getDownloadURL(ref);
    return { downloadUrl };
}

function upload(
    uploadTask: UploadTask,
    storageRef: StorageReference
): Promise<{ downloadUrl: string }> {
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            () => {
                // TODO: 進捗状況を表示する
            },
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
}
