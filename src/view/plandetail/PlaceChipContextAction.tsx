import { Link } from "@chakra-ui/next-js";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { getAnalytics, logEvent } from "@firebase/analytics";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import {
    MdOutlineCameraAlt,
    MdOutlineDeleteOutline,
    MdOutlineFindReplace,
} from "react-icons/md";
import { SiGooglemaps, SiInstagram } from "react-icons/si";
import { AnalyticsEvents } from "src/view/constants/analytics";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";
import { UploadPlaceImageProps } from "src/view/hooks/useUploadPlaceImage";
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
    const { t } = useAppTranslation();
    return (
        <PlaceChipContextAction
            label={t("common:delete")}
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
    const { t } = useTranslation();
    return (
        <PlaceChipContextAction
            label={t("place:relatedPlacesShow")}
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
    const { t } = useTranslation();
    return (
        <Link
            href={`https://www.instagram.com/explore/tags/${encodeURIComponent(
                // タグ検索をするときはスペースを削除する
                placeName.replaceAll(/\s+/g, "")
            )}/`}
            target="_blank"
            onChange={() =>
                logEvent(
                    getAnalytics(),
                    AnalyticsEvents.Plan.Place.SearchByInstagram
                )
            }
        >
            <PlaceChipContextAction
                label={t("place:searchByInstagram")}
                icon={SiInstagram}
            />
        </Link>
    );
};

export const PlaceChipActionGoogleMaps = ({
    placeName,
    googlePlaceId,
    onClick,
}: {
    placeName: string;
    googlePlaceId: string;
    onClick?: OnClickHandler;
}) => {
    const { t } = useTranslation();
    const url = new URL("https://www.google.com/maps/search/");
    url.searchParams.set("api", "1");
    url.searchParams.set("query", placeName);
    url.searchParams.set("query_place_id", googlePlaceId);
    return (
        <Link
            target="_blank"
            href={encodeURI(decodeURIComponent(url.toString()))}
            onClick={() =>
                logEvent(
                    getAnalytics(),
                    AnalyticsEvents.Plan.Place.SearchByGoogleMaps
                )
            }
        >
            <PlaceChipContextAction
                label={t("place:searchByGoogleMaps")}
                icon={SiGooglemaps}
            />
        </Link>
    );
};

export type PlaceChipActionCameraProps = {
    placeId: string;
} & UploadPlaceImageProps;

export const PlaceChipActionCamera = ({
    placeId,
    onFileChanged,
}: PlaceChipActionCameraProps) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <HStack
                backgroundColor="#FCF2E4"
                color="#483216"
                onClick={() => fileInputRef.current?.click()}
                px="8px"
                py="4px"
                borderRadius="20px"
                as="button"
            >
                <Icon w="16px" h="16px" as={MdOutlineCameraAlt} />
                <Text fontSize="0.8rem" whiteSpace="nowrap">
                    {t("place:uploadPlacePhoto")}
                </Text>
            </HStack>
            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                    onFileChanged({
                        files: e.target.files,
                        placeId,
                    })
                }
                style={{ display: "none" }}
            />
        </div>
    );
};
