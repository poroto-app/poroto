import { Switch, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { LocationPermission, LocationPermissions } from "src/hooks/useLocation";
import MapIcon from "src/view/assets/svg/map.svg";

type Props = {
    locationPermission: LocationPermission | null;
    isUpdating: boolean;
    onClickSwitch: () => void;
};

// TODO: search ディレクトリに移動する
export function LocationUnavailable({
    locationPermission,
    isUpdating,
    onClickSwitch,
}: Props) {
    const { t } = useTranslation();
    const handleOnClickSwitch = () => {
        if (locationPermission === LocationPermissions.GRANTED) return;
        onClickSwitch();
    };

    return (
        <VStack w="100%" px="16px" py="16px" spacing="16px">
            <MapIcon
                viewBox="0 0 687.41943 631.17578"
                style={{
                    height: 200,
                    maxWidth: "100%",
                }}
            />
            <Text fontWeight="bold" fontSize="20px">
                {locationPermission === LocationPermissions.GRANTED
                    ? t("plan:searchNearbyPlansInProgress")
                    : locationPermission === LocationPermissions.DENIED
                      ? // TODO: iOSの場合は許可方法を伝えるページを作る
                        t("plan:searchNearbyPlansLocationPermissionDenied")
                      : t("plan:searchNearbyPlansLocationPermissionNotGranted")}
            </Text>
            <Switch
                size="lg"
                isChecked={
                    isUpdating ||
                    locationPermission === LocationPermissions.GRANTED
                }
                isDisabled={isUpdating}
                onChange={handleOnClickSwitch}
            />
        </VStack>
    );
}
