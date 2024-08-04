import { UserRound } from "@tamagui/lucide-icons";
import { Size } from "src/constant/size";
import { User } from "src/domain/models/User";
import { appImageLoader } from "src/view/image/appImageLoader";
import { Avatar, XStack } from "tamagui";

type Props = {
    user: User | null;
    onClick?: () => void;
};

export function UserAvatar({ user, onClick }: Props) {
    return (
        <XStack onPress={onClick}>
            <XStack
                w={Size.NavBar.avatar.width}
                h={Size.NavBar.avatar.height}
                borderRadius={999}
                overflow="hidden"
                backgroundColor="rgba(0,0,0,.1)"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                {user?.avatarImage ? (
                    <Avatar circular size={Size.NavBar.avatar.width}>
                        <Avatar.Image
                            source={{
                                uri: appImageLoader({
                                    src: user?.avatarImage,
                                    width: Size.NavBar.avatar.width,
                                }),
                            }}
                            alt="avatar image"
                        />
                        <Avatar.Fallback
                            borderColor="rgba(0,0,0,.1)"
                            borderWidth={1}
                        />
                    </Avatar>
                ) : (
                    <XStack borderRadius={999}>
                        <UserRound
                            size={Size.NavBar.avatar.width - 8}
                            color="#8f9faa"
                        />
                    </XStack>
                )}
            </XStack>
        </XStack>
    );
}
