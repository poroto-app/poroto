import { Link } from "@chakra-ui/next-js";
import { HStack,Icon,Text } from "@chakra-ui/react";
import { useRef,useState } from "react";
import { IconType } from "react-icons";
import {
MdOutlineCameraAlt,
MdOutlineDeleteOutline,
MdOutlineFindReplace
} from "react-icons/md";
import { SiGooglemaps,SiInstagram } from "react-icons/si";
import useUploadImage from "src/view/hooks/useUploadImage";
import DialogUploadImage from "src/view/plancandidate/DialogUploadImage";
import { OnClickHandler } from "src/view/types/handler";


type Props = {
    label: string;
    icon: IconType;
    onClick?: OnClickHandler;
};

export const PlaceChipContextAction = ({ label, icon, onClick }: Props) => {
    return (
        <HStack
            backgroundColor="#FCF2E4"
            color="#483216"
            onClick={onClick}
            as="button"
            px="8px"
            py="4px"
            borderRadius="20px"
        >
            <Icon w="16px" h="16px" as={icon} />
            <Text fontSize="0.8rem" whiteSpace="nowrap">
                {label}
            </Text>
        </HStack>
    );
};

export const PlaceChipActionDelete = ({
    onClick,
}: {
    onClick: OnClickHandler;
}) => {
    return (
        <PlaceChipContextAction
            label="削除"
            icon={MdOutlineDeleteOutline}
            onClick={onClick}
        />
    );
};

export const PlaceChipActionShowRelatedPlaces = ({
    onClick,
}: {
    onClick: OnClickHandler;
}) => {
    return (
        <PlaceChipContextAction
            label="関連した場所を表示"
            icon={MdOutlineFindReplace}
            onClick={onClick}
        />
    );
};

export const PlaceChipActionInstagram = ({
    placeName,
}: {
    placeName: string;
}) => {
    return (
        <Link
            href={`https://www.instagram.com/explore/tags/${encodeURIComponent(
                // タグ検索をするときはスペースを削除する
                placeName.replaceAll(/\s+/g, "")
            )}/`}
            target="_blank"
        >
            <PlaceChipContextAction
                label="Instagramで検索"
                icon={SiInstagram}
            />
        </Link>
    );
};

export const PlaceChipActionGoogleMaps = ({
    placeName,
    googlePlaceId,
}: {
    placeName: string;
    googlePlaceId: string;
}) => {
    const url = new URL("https://www.google.com/maps/search/");
    url.searchParams.set("api", "1");
    url.searchParams.set("query", placeName);
    url.searchParams.set("query_place_id", googlePlaceId);
    return (
        <Link
            target="_blank"
            href={encodeURI(decodeURIComponent(url.toString()))}
        >
            <PlaceChipContextAction
                label="Google Mapsで検索"
                icon={SiGooglemaps}
            />
        </Link>
    );
};

export const PlaceChipActionCamera = () => {
    const { file, isUpload, handleFileChange, handleUpload } = useUploadImage();
    const [dialogVisible, setDialogVisible] = useState(false);
    const fileInputRef = useRef(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFileChange(selectedFile);
        setDialogVisible(true);
    };

    const handleUploadClick = () => {
        handleUpload();
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
    };

    const imageUrl = file ? URL.createObjectURL(file) : "";

    return (
        <div>
            <PlaceChipContextAction
                label="写真をアップロード"
                icon={MdOutlineCameraAlt}
                onClick={handleUploadButtonClick}
            />
            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
            />
            <DialogUploadImage
                visible={dialogVisible}
                isUpload={isUpload}
                imageUrl={imageUrl}
                onUploadClick={handleUploadClick}
                onClose={handleCloseDialog}
            />
        </div>
    );
};
