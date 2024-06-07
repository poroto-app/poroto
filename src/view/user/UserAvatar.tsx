import { Avatar, Center, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { User } from "src/domain/models/User";
import { Size } from "src/view/constants/size";
import { zIndex } from "src/view/constants/zIndex";

type Props = {
    user: User | null;
    onClick: () => void;
};

export function UserAvatar({ user, onClick }: Props) {
    return (
        <Center onClick={onClick}>
            <Center
                w={Size.NavBar.avatar.width + "px"}
                h={Size.NavBar.avatar.height + "px"}
                borderRadius="50%"
                overflow="hidden"
                backgroundColor="rgba(0,0,0,.1)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                {user ? (
                    <>
                        <Skeleton
                            position="absolute"
                            top="0"
                            right="0"
                            bottom="0"
                            left="0"
                        />
                        <Image
                            height={33}
                            width={33}
                            alt="avatar image"
                            src={user.avatarImage}
                            style={{ zIndex: zIndex.navBarAvatarIcon }}
                        />
                    </>
                ) : (
                    <Avatar
                        h="33px"
                        w="33px"
                        src={user?.avatarImage}
                        border="1px solid rgba(0,0,0,.1)"
                        backgroundColor={
                            user?.avatarImage ? "whiter" : "#a9a9a9"
                        }
                    />
                )}
            </Center>
        </Center>
    );
}
