import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { MdOutlineEdit } from "react-icons/md";
import { User } from "src/domain/models/User";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Padding } from "src/view/constants/padding";

type Props = {
    user: User | null;
    isEditable?: boolean;
    onEdit?: () => void;
};

export function UserCard({ user, isEditable = false, onEdit }: Props) {
    return (
        <Center
            w="100%"
            py={Padding.p16}
            px={Padding.p16}
            backgroundColor="white"
            borderRadius="20px"
            boxShadow="0px 0px 20px #F0DFCA"
        >
            <VStack spacing={Padding.p16} position="relative" w="100%">
                {isEditable && (
                    <HStack
                        as="button"
                        px="8px"
                        py="4px"
                        border="1px solid rgba(0,0,0,.1)"
                        borderRadius="20px"
                        position="absolute"
                        top="12px"
                        right="12px"
                        onClick={onEdit}
                    >
                        <Icon
                            w="24px"
                            h="24px"
                            color="rgba(0,0,0,.5)"
                            as={MdOutlineEdit}
                        />
                        <Text>編集</Text>
                    </HStack>
                )}
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
        </Center>
    );
}
