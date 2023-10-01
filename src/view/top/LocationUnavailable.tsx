import { Switch, Text, VStack } from "@chakra-ui/react";
import MapIcon from "src/view/assets/svg/map.svg";

type Props = {
    isUpdating: boolean;
    isLocationAvailable: boolean;
    onClickSwitch: () => void;
};

export function LocationUnavailable({
    isUpdating,
    isLocationAvailable,
    onClickSwitch,
}: Props) {
    const handleOnClickSwitch = () => {
        if (isLocationAvailable) return;
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
                位置情報をオンにしてプランを取得
            </Text>
            <Switch
                size="lg"
                isChecked={isUpdating || isLocationAvailable}
                isDisabled={isUpdating}
                onChange={handleOnClickSwitch}
            />
        </VStack>
    );
}
