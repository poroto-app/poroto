import { Center, Text } from "@chakra-ui/react";
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
        <GoogleAdsense
            format="fluid"
            parentStyle={{ width: "100%", height: "100%" }}
            style={{ maxHeight: "360px", maxWidth: "300px", margin: "0 auto" }}
            layout="+22+s6-1h-2r+au"
            slot={process.env.ADSENSE_SLOT_TOP_PAGE_INFEED}
        />
    );
}
