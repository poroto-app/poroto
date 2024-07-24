import {
    Avatar,
    Box,
    Center,
    HStack,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { User } from "src/domain/models/User";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Padding } from "src/constant/padding";

type Props = {
    user: User | null;
    isEditable?: boolean;
    onEdit?: () => void;
    onClickAvatarIcon?: () => void;
};

export function UserCard({
    user,
    isEditable = false,
    onEdit,
    onClickAvatarIcon,
}: Props) {
    return (
        <Center
            w="100%"
            py={Padding.p16 + "px"}
            px={Padding.p16 + "px"}
            backgroundColor="white"
            borderRadius="20px"
            boxShadow="0px 0px 20px #F0DFCA"
        >
            <VStack spacing={Padding.p16 + "px"} position="relative" w="100%">
                <Box
                    width="100px"
                    height="100px"
                    backgroundColor="gray.200"
                    borderRadius="100%"
                    overflow="hidden"
                >
                    {user?.avatarImage ? (
                        <Box as="button" onClick={onClickAvatarIcon}>
                            <ImageWithSkeleton src={user.avatarImage} />
                        </Box>
                    ) : (
                        <Avatar size="full" />
                    )}
                </Box>
                <Center maxW="100%" h="50px">
                    {user ? (
                        <HStack spacing={Padding.p8 + "px"}>
                            <Text fontWeight="bold" fontSize="32px">
                                {user.name}
                            </Text>
                            {isEditable && (
                                <Center
                                    as="button"
                                    w="36px"
                                    h="36px"
                                    border="1px solid rgba(0,0,0,.1)"
                                    _hover={{ backgroundColor: "gray.100" }}
                                    borderRadius="20px"
                                    onClick={onEdit}
                                >
                                    <Icon
                                        w="20px"
                                        h="20px"
                                        color="rgba(0,0,0,.5)"
                                        as={MdEdit}
                                    />
                                </Center>
                            )}
                        </HStack>
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
