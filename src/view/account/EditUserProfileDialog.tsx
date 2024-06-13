import {
    Box,
    Center,
    HStack,
    Icon,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdClose, MdPhotoCamera } from "react-icons/md";
import { User } from "src/domain/models/User";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Padding } from "src/view/constants/padding";

type Props = {
    isVisible: boolean;
    user: User;
    onSaveProfile?: (props: {
        name?: string;
        profileImageUrl?: string;
    }) => void;
    onClose?: () => void;
};

export function EditUserProfileDialog({
    user,
    isVisible,
    onSaveProfile,
    onClose,
}: Props) {
    const [userName, setUserName] = useState(user.name);

    const handleOnSave = () => {
        onSaveProfile?.({ name: userName });
    };

    return (
        <FullscreenDialog visible={isVisible} onClickOutside={onClose}>
            <RoundedDialog>
                <VStack px={Padding.p16} py={Padding.p16} minH="350px">
                        <ProfileEditor
                            userName={userName}
                            profileImageUrl={user.avatarImage}
                            onUpdateUserName={setUserName}
                            onClose={onClose}
                            onSave={handleOnSave}
                        />
                </VStack>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function ProfileEditor({
    userName,
    profileImageUrl,
    onUpdateUserName,
    onClose,
    onSave,
}: {
    userName: string;
    profileImageUrl: string;
    onUpdateUserName: (name: string) => void;
    onClose: () => void;
    onSave: () => void;
}) {
    const [focusUserName, setFocusUserName] = useState(false);

    return (
        <VStack
            w="100%"
            h="100%"
            flex={1}
            spacing={Padding.p16}
            justifyContent="space-between"
        >
            <HStack w="100%" pb={Padding.p16}>
                <Text flex={1} fontWeight="semibold">
                    プロフィールを編集
                </Text>
                <Center as="button" onClick={onClose}>
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
                    width="150px"
                    height="150px"
                    backgroundColor="gray.200"
                    borderRadius="100%"
                    overflow="hidden"
                >
                    <ImageWithSkeleton src={profileImageUrl} />
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
                border={`1px solid ${focusUserName ? "rgba(29,155,240)" : "rgba(0,0,0,.1)"}`}
                alignItems="flex-start"
                px={Padding.p8}
                py={Padding.p4}
                spacing={0}
                borderRadius="8px"
            >
                <Text
                    color={
                        focusUserName ? "rgba(29,155,240)" : "rgba(0,0,0,.6)"
                    }
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
                    onChange={(e) => onUpdateUserName(e.target.value)}
                    _focus={{ border: "none", boxShadow: "none" }}
                    onFocus={() => setFocusUserName(true)}
                    onBlur={() => setFocusUserName(false)}
                />
            </VStack>
            <RoundedButton onClick={onSave}>
                <Text>保存</Text>
            </RoundedButton>
        </VStack>
    );
}
