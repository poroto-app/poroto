export const CloudStoragePath = {
    profileImage({
        cloudStorageDomain,
        firebaseUid,
        fileName,
    }: {
        cloudStorageDomain?: { protocol: string; host: string; bucketName };
        firebaseUid: string;
        fileName?: string;
    }) {
        let path = `/public/images/profile_pictures/${firebaseUid}/original`;

        if (cloudStorageDomain) {
            path = `${cloudStorageDomain.protocol}://${cloudStorageDomain.host}/${cloudStorageDomain.bucketName}${path}`;
        }

        if (fileName) {
            path = `${path}/${fileName}`;
        }

        return path;
    },
} as const;
