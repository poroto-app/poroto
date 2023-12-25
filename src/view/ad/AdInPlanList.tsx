import { Box, Center, Text } from "@chakra-ui/react";
import { GoogleAdsense } from "./GoogleAdsense";

export function AdInPlanList() {
    if (process.env.APP_ENV !== "production") {
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
        <Box w="100%" h="100%" minWidth="250px">
            <GoogleAdsense
                style={{ width: "100%", height: "100%", minWidth: "250px" }}
                format="fluid"
                layout="+22+s6-1h-2r+au"
                slot={process.env.ADSENSE_SLOT_TOP_INFEED}
            />
        </Box>
    );
}
