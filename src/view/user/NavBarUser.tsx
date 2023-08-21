import { Button, HStack, Text } from "@chakra-ui/react";
import { User } from "src/domain/models/User";

type Props = {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
};

export function NavBarUser({ user, onLogin, onLogout }: Props) {
    if (!user) {
        return <Button onClick={onLogin}>ログイン</Button>;
    }

    return (
        <HStack>
            <Text>{user.name}</Text>
            <Button onClick={onLogout}>ログアウト</Button>
        </HStack>
    );
}
