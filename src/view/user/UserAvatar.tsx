import {User} from "src/domain/models/User";
import {Avatar} from "@chakra-ui/react";

type Props = {
    user: User | null;
    onClick: () => void;
}

export function UserAvatar({user, onClick}: Props) {
   return <Avatar
        h="33px"
        w="33px"
        onClick={onClick}
        cursor={onClick && "pointer"}
        src={user?.avatarImage}
        border="1px solid rgba(0,0,0,.1)"
    />
}