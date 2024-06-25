import {
    getDownloadURL,
    StorageReference,
    uploadBytesResumable,
    UploadTask,
} from "firebase/storage";

export async function uploadDataToCloudStorage(
    data: Blob | Uint8Array | ArrayBuffer,
    storageRef: StorageReference
): Promise<{ downloadUrl: string }> {
    const uploadTask = uploadBytesResumable(storageRef, data);
    return upload(uploadTask);
}

function upload(uploadTask: UploadTask): Promise<{ downloadUrl: string }> {
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
