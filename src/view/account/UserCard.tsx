import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { User } from "src/domain/models/User";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Padding } from "src/view/constants/padding";

type Props = {
    user: User | null;
};

export function UserCard({ user }: Props) {
    return (
        <VStack
            w="100%"
            py={Padding.p16}
            px={Padding.p16}
            backgroundColor="white"
            borderRadius="20px"
            boxShadow="0px 0px 20px #F0DFCA"
            spacing={Padding.p16}
        >
            <Box
                width="100px"
                height="100px"
                backgroundColor="gray.200"
                borderRadius="100%"
                overflow="hidden"
            >
                {user && <ImageWithSkeleton src={user.avatarImage} />}
            </Box>
            <Center maxW="100%" h="50px">
                {user ? (
                    <Text fontWeight="bold" fontSize="32px">
                        {user.name}
                    </Text>
                ) : (
                    <Box
                        borderRadius="30px"
                        w="300px"
                        h="32px"
                        backgroundColor="gray.200"
                    />
                )}
            </Center>
        </VStack>
    );
}
