import { Switch, Text, VStack } from "@chakra-ui/react";
import MapIcon from "src/view/assets/svg/map.svg";
import {
    LocationPermission,
    LocationPermissions,
} from "src/view/hooks/useLocation";

type Props = {
    locationPermission: LocationPermission | null;
    isUpdating: boolean;
    onClickSwitch: () => void;
};

export function LocationUnavailable({
    locationPermission,
    isUpdating,
    onClickSwitch,
}: Props) {
    const handleOnClickSwitch = () => {
        if (locationPermission === LocationPermissions.GRANTED) return;
        onClickSwitch();
    };

    return (
        <VStack w="100%" px="16px" py="16px">
            <MapIcon
                viewBox="0 0 687.41943 631.17578"
                style={{
                    height: 200,
                    maxWidth: "100%",
                }}
            />
            <Text fontWeight="bold" fontSize="20px">
                {locationPermission === LocationPermissions.GRANTED
                    ? "近くのプランを探しています..."
                    : locationPermission === LocationPermissions.DENIED
                    ? "設定から位置情報を許可してください"
                    : "位置情報をオンにしてプランを取得"}
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
