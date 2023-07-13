import { Center, VStack, Text} from "@chakra-ui/react";
import { Colors } from "src/view/constants/color";

export const PlanGenerationFailure = () => {
    return (
        <Center w="100%" h="100%">
                <Center flexDirection="column" flex={1} w="100%" px="16px">
                    <VStack
                        color={Colors.primary["400"]}
                        w="100%"
                        alignItems="flex-start"
                        spacing={0}
                    >
                        <Text fontSize="160px" lineHeight={1} fontWeight="bold">
                            Sorry
                        </Text>
                    </VStack>
                    <VStack
                        spacing={0}
                        w="100%"
                        alignItems="flex-start"
                        color="#222222"
                    >
                        <Text>
                            しおりを作成することができませんでした。
                        </Text>
                    </VStack>
                </Center>
        </Center>
    );
};