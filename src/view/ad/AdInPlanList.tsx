import { Center, Text } from "@chakra-ui/react";

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
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="fluid"
            data-ad-layout-key="+22+s6-1h-2r+au"
            data-ad-client={process.env.ADSENSE_CLIENT}
            data-ad-slot={process.env.ADSENSE_SLOT_TOP_INFEED}
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
        />
    );
}
