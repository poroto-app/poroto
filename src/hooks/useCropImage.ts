import { useState } from "react";
import { Area } from "react-easy-crop";
import { hasValue } from "src/domain/util/null";

export type ImageData = {
    dataUrl: string;
    blob: Blob;
};

export const useCropImage = ({
    originalImageSrc,
}: {
    originalImageSrc: string;
}) => {
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<
        string | null
    >(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>();
    const [isCropInProgress, setIsCropInProgress] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null
    );

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const cropImage = async (): Promise<ImageData | null> => {
        if (isCropInProgress) {
            return null;
        }

        if (!croppedAreaPixels) {
            return null;
        }

        setIsCropInProgress(true);
        let croppedImg: {
            dataUrl: string;
            blob: Blob;
        } | null = null;
        try {
            const { blob, dataUrl } = await createCroppedImage(
                originalImageSrc,
                croppedAreaPixels,
                0,
                { horizontal: false, vertical: false }
            );
            croppedImg = { dataUrl, blob };
            setCroppedImageDataUrl(dataUrl);
            setCroppedImageBlob(blob);
        } finally {
            setIsCropInProgress(false);
        }

        return croppedImg;
    };

    return {
        crop,
        zoom,
        croppedImage:
            hasValue(croppedImageDataUrl) && hasValue(croppedImageBlob)
                ? {
                      dataUrl: croppedImageDataUrl,
                      blob: croppedImageBlob,
                  }
                : null,
        isCropInProgress,
        setCrop,
        setZoom,
        cropImage,
        onCropComplete,
    };
};

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });
}

function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation);
    return {
        width:
            Math.abs(Math.cos(rotRad) * width) +
            Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) +
            Math.abs(Math.cos(rotRad) * height),
    };
}

async function createCroppedImage(
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
): Promise<ImageData> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // fill canvas with white color
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, image.width, image.height);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
        return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As a blob
    return new Promise((resolve, reject) => {
        croppedCanvas.toBlob((blob) => {
            resolve({
                blob,
                dataUrl: URL.createObjectURL(blob),
            });

            canvas.remove();
            croppedCanvas.remove();
        }, "image/jpeg");
    });
}
