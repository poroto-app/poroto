import { Box, Center, Grid, Text, VStack } from "@chakra-ui/react";
import { MdOutlineLocationOn, MdOutlineMap } from "react-icons/md";
import HangOut from "src/view/assets/svg/hangout.svg";
import { Routes } from "src/view/constants/router";
import styled from "styled-components";
import { CreatePlanButton } from "./CreatePlanButton";

export function CreatePlanSection() {
    return (
        <Center
            w="100%"
            backgroundColor="#BD9F8E"
            pt="32px"
            pb="32px"
            px="24px"
            overflow="hidden"
        >
            <Container>
                <HangoutIcon />
                <VStack
                    w="100%"
                    maxW="500px"
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
                        gap="16px"
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
                            link={Routes.places.search({})}
                        />
                    </Grid>
                </VStack>
            </Container>
        </Center>
    );
}

const HangoutIcon = () => {
    // MEMO: 上方向の余白を消すために200px分の高さを小さくしている
    return (
        <Box
            position="relative"
            w="100%"
            maxW="500px"
            pt={{ base: "calc(500px - 200px)", sm: "300px" }}
        >
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

const Container = styled.div`
    display: flex;
    gap: 64px;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 800px;

    @media (min-width: 700px) {
        padding-top: 32px;
        padding-bottom: 32px;
        flex-direction: row;
    }
`;
