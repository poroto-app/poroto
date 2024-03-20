import { Link } from "@chakra-ui/next-js";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IconType } from "react-icons";
import {
    MdOutlineCameraAlt,
    MdOutlineDeleteOutline,
    MdOutlineFindReplace,
} from "react-icons/md";
import { SiGooglemaps, SiInstagram } from "react-icons/si";
import { reduxAuthSelector } from "src/redux/auth";
import { reduxPlanSelector } from "src/redux/plan";
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

// TODO: リファクタする
export const PlaceChipActionCamera = ({ placeId }: { placeId: string }) => {
    const { localFiles, isUploading, handleFileChange, handleUpload } =
        useUploadImage();
    const [dialogVisible, setDialogVisible] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = reduxAuthSelector();
    const { preview: plan } = reduxPlanSelector();

    const handleUploadButtonClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            handleFileChange(selectedFiles);
        }
        setDialogVisible(selectedFiles && selectedFiles.length > 0);
    };

    // ログインユーザーでなければアップロードできない
    if (!user) return <></>;

    // 保存済みプランに対する操作でなければ表示しない
    if (!plan) return <></>;

    return (
        <div>
            <HStack
                backgroundColor="#FCF2E4"
                color="#483216"
                onClick={handleUploadButtonClick}
                px="8px"
                py="4px"
                borderRadius="20px"
                as="button"
            >
                <Icon w="16px" h="16px" as={MdOutlineCameraAlt} />
                <Text fontSize="0.8rem" whiteSpace="nowrap">
                    写真をアップロード
                </Text>
            </HStack>
            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                style={{ display: "none" }}
            />
            <DialogUploadImage
                visible={dialogVisible}
                isUploading={isUploading}
                imageURLs={localFiles.map((localFile) =>
                    URL.createObjectURL(localFile)
                )}
                onUploadClick={() =>
                    handleUpload({
                        placeId,
                        userId: user.id,
                        planId: plan.id,
                    })
                }
                onClose={() => setDialogVisible(false)}
            />
        </div>
    );
};
