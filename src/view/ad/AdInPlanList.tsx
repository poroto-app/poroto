import { Center, Text } from "@chakra-ui/react";
import { GoogleAdsense } from "./GoogleAdsense";

export function AdInPlanList() {
    if (process.env.NODE_ENV !== "production") {
        return (
            <Center
                w="100%"
                h="100%"
                backgroundColor="#EEEEEE"
                userSelect="none"
            >
                <Text>Infeed</Text>
            </Center>
        );
    }

    return (
        <GoogleAdsense
            format="auto"
            layout="+22+s6-1h-2r+au"
            slot={process.env.ADSENSE_SLOT_TOP_INFEED}
        />
    );
}
