import { Avatar } from "@chakra-ui/react";
import { User } from "src/domain/models/User";

type Props = {
    user: User | null;
    onClick: () => void;
};

export function UserAvatar({ user, onClick }: Props) {
    return (
        <button onClick={onClick}>
            <Avatar
                h="33px"
                w="33px"
                src={user?.avatarImage}
                border="1px solid rgba(0,0,0,.1)"
                backgroundColor={user?.avatarImage ? "whiter" : "#a9a9a9"}
            />
        </button>
    );
}
