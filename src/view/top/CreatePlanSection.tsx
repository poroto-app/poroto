import { Box, Center, Grid, Text, VStack } from "@chakra-ui/react";
import { MdOutlineLocationOn, MdOutlineMap } from "react-icons/md";
import HangOut from "src/view/assets/svg/hangout.svg";
import { Routes } from "src/view/constants/router";
import { CreatePlanButton } from "./CreatePlanButton";

export function CreatePlanSection() {
    return (
        <Center
            w="100%"
            backgroundColor="#BD9F8E"
            pt="32px"
            pb="64px"
            px="24px"
        >
            <VStack
                w="100%"
                maxW="600px"
                spacing={{ base: "32px", sm: "64px" }}
                alignItems="center"
            >
                <HangoutIcon />
                <VStack
                    w="100%"
                    maxW="400px"
                    alignItems="flex-start"
                    spacing="16px"
                >
                    <Text
                        as="h1"
                        color="white"
                        fontWeight="bold"
                        fontSize="24px"
                        zIndex="10"
                    >
                        暇つぶしプランを作ろう
                    </Text>
                    <Grid
                        w="100%"
                        templateColumns="repeat(2, 1fr)"
                        gap="8px"
                        filter="drop-shadow(20px 20px 60px #a18779)"
                        transform="translateZ(0px)"
                    >
                        <CreatePlanButton
                            title="現在地から"
                            icon={MdOutlineLocationOn}
                            link={Routes.plans.interest()}
                        />
                        <CreatePlanButton
                            title="好きな場所から"
                            icon={MdOutlineMap}
                            link={Routes.places.search}
                        />
                    </Grid>
                </VStack>
            </VStack>
        </Center>
    );
}

const HangoutIcon = () => {
    // MEMO: 上方向の余白を消すために200px分の高さを小さくしている
    return (
        <Box position="relative" w="100%" maxW="500px" pt="calc(600px - 200px)">
            <HangOut
                viewBox="0 0 785.77114 658"
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                }}
            />
        </Box>
    );
};
