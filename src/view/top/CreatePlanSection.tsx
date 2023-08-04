import { Center, Grid, Image, Text, VStack } from "@chakra-ui/react";
import { MdOutlineLocationOn, MdOutlineMap } from "react-icons/md";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { CreatePlanButton } from "./CreatePlanButton";

export function CreatePlanSection() {
    return (
        <Center w="100%" backgroundColor="#BD9F8E" py="84px" px="24px">
            <VStack
                w="100%"
                maxW="600px"
                spacing="32px"
            >
                <Image
                    src="/images/hangout.svg"
                    alt="logo"
                    w="100%"
                    maxW="500px"
                />
                <VStack w="100%" alignItems="flex-start" spacing="16px">
                    <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="1.75rem"
                        zIndex="10"
                    >
                        暇つぶしプランを作ろう
                    </Text>
                    <Grid
                        w="100%"
                        templateColumns="repeat(2, 1fr)"
                        gap="8px"
                        filter="drop-shadow(20px 20px 60px #a18779) drop-shadow(-20px -20px 60px #d9b7a3)"
                        transform="translateZ(0px)"
                    >
                        <CreatePlanButton
                            title="現在地から"
                            icon={MdOutlineLocationOn}
                            link={Routes.plans.interest}
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
