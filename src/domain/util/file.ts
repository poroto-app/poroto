export function getFileExtension(filename: string): string | null {
    const parts = filename.split(".");
    if (parts.length === 1) {
        return null;
    }
    return parts.pop();
}
