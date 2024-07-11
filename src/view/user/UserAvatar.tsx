import { Avatar, Center } from "@chakra-ui/react";
import { User } from "src/domain/models/User";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Size } from "src/view/constants/size";
import { appImageLoader } from "src/view/image/appImageLoader";

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
                {user?.avatarImage ? (
                    <ImageWithSkeleton
                        src={appImageLoader({
                            src: user.avatarImage,
                            width: Size.NavBar.avatar.width,
                        })}
                        alt="avatar image"
                    />
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
