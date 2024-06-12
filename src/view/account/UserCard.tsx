import {
    Box,
    Center,
    HStack,
    Icon,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import {ReactNode, useState} from "react";
import {MdClose, MdOutlineEdit, MdPhotoCamera} from "react-icons/md";
import { User } from "src/domain/models/User";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Padding } from "src/view/constants/padding";

type Props = {
    user: User | null;
    isEditable?: boolean;
    isEditing?: boolean;
    onEdit?: () => void;
    onSaveProfile?: (props: {name?: string, profileImageUrl?: string}) => void;
    onCloseEdit?: () => void;
};

export function UserCard({
    user,
    isEditable = false,
    isEditing = false,
    onEdit,
}: Props) {
    if (isEditing)
        return (
            <Container>
                <Editing user={user} />
            </Container>
        );
    return (
        <Container>
            <Preview user={user} isEditable={isEditable} onEdit={onEdit} />
        </Container>
    );
}

function Container({ children }: { children?: ReactNode }) {
    return (
        <Center
            w="100%"
            py={Padding.p16}
            px={Padding.p16}
            backgroundColor="white"
            borderRadius="20px"
            boxShadow="0px 0px 20px #F0DFCA"
        >
            {children}
        </Center>
    );
}

function Preview({ user, isEditable, onEdit }: Props) {
    return (
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
    );
}

function Editing({ user, onSaveProfile, onCloseEdit }: Props) {
    const [userName, setUserName] = useState(user.name);
    const [focusUserName, setFocusUserName] = useState(false);

    const handleOnSave = () => {
        onSaveProfile?.({ name: userName });
    }

    return (
        <VStack w="100%" spacing={Padding.p16} maxW="600px">
            <HStack w="100%" pb={Padding.p16}>
                <Text flex={1} fontWeight="semibold">プロフィールを編集</Text>
                <Center as="button" onClick={onCloseEdit}>
                    <Icon
                        w="24px"
                        h="24px"
                        color="rgba(0,0,0,.5)"
                        as={MdClose}
                    />
                </Center>
            </HStack>
            <Box position="relative" pb="16px">
                <Box
                    width="100px"
                    height="100px"
                    backgroundColor="gray.200"
                    borderRadius="100%"
                    overflow="hidden"
                >
                    {user && <ImageWithSkeleton src={user.avatarImage} />}
                </Box>
                <Center
                    w="100%"
                    position="absolute"
                    right={0}
                    bottom={0}
                    left={0}
                >
                    <Center
                        as="button"
                        border="1px solid rgba(0,0,0,.1)"
                        backgroundColor="white"
                        borderRadius="100"
                        px={Padding.p8}
                        py={Padding.p4}
                    >
                        <Icon
                            w="24px"
                            h="24px"
                            color="rgba(0,0,0,.7)"
                            as={MdPhotoCamera}
                        />
                    </Center>
                </Center>
            </Box>
            <VStack
                w="100%"
                border={`1px solid ${focusUserName ? "rgba(29,155,240)" : "rgba(0,0,0,.1)"  }`}
                alignItems="flex-start"
                px={Padding.p8}
                py={Padding.p4}
                spacing={0}
                borderRadius="8px"
            >
                <Text
                    color={focusUserName ? "rgba(29,155,240)" : "rgba(0,0,0,.6)"}
                    fontSize="12px"
                >
                    名前
                </Text>
                <Input
                    border="none"
                    value={userName}
                    px={0}
                    py={0}
                    height="auto"
                    onChange={(e) => setUserName(e.target.value)}
                    _focus={{ border: "none", boxShadow: "none" }}
                    onFocus={() => setFocusUserName(true)}
                    onBlur={() => setFocusUserName(false)}
                />
            </VStack>
            <RoundedButton onClick={() => handleOnSave()}>
                <Text>保存</Text>
            </RoundedButton>
        </VStack>
    );
}
