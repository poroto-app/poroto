import { getAnalytics, logEvent } from "@firebase/analytics";
import { IconProps } from "@tamagui/helpers-icon";
import {
    Camera,
    Instagram,
    MapPin,
    Replace,
    Trash,
} from "@tamagui/lucide-icons";
import { NamedExoticComponent, ReactNode, useRef } from "react";
import { Link } from "solito/link";
import { AnalyticsEvents } from "src/constant/analytics";
import { Padding } from "src/constant/padding";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { UploadPlaceImageProps } from "src/hooks/useUploadPlaceImage";
import { OnClickHandler } from "src/types/handler";
import { Text, XStack } from "tamagui";

type Props = {
    label: string;
    icon: NamedExoticComponent<IconProps>;
    onClick?: OnClickHandler;
    children?: ReactNode;
};

export const PlaceChipContextAction = ({
    label,
    icon: Icon,
    children,
    onClick,
}: Props) => {
    return (
        <XStack
            tag="button"
            backgroundColor="#FCF2E4"
            borderRadius={20}
            px={Padding.p8}
            py={Padding.p4}
            gap={Padding.p4}
            alignItems="center"
            justifyContent="center"
            onPress={onClick}
        >
            <Icon size={16} color="#483216" />
            <Text fontSize={12} whiteSpace="nowrap" color="#483216">
                {label}
            </Text>
            {children}
        </XStack>
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
            icon={Trash}
            onClick={onClick}
        />
    );
};

export const PlaceChipActionShowRelatedPlaces = ({
    onClick,
}: {
    onClick: OnClickHandler;
}) => {
    const { t } = useAppTranslation();
    return (
        <PlaceChipContextAction
            label={t("place:relatedPlacesShow")}
            icon={Replace}
            onClick={onClick}
        />
    );
};

export const PlaceChipActionInstagram = ({
    placeName,
}: {
    placeName: string;
}) => {
    const { t } = useAppTranslation();
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
                icon={Instagram}
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
    const { t } = useAppTranslation();
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
                icon={MapPin}
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
    const { t } = useAppTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <PlaceChipContextAction
            label={t("place:uploadPlacePhoto")}
            icon={Camera}
            onClick={() => fileInputRef.current?.click()}
        >
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
        </PlaceChipContextAction>
    );
};
