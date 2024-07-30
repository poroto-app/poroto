import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavBarProps } from "src/types/props";
import { NavBarComponent } from "src/view/navigation/NavBarComponent";
import { NavBarUser } from "src/view/navigation/NavBarUser";

// TODO: implement me!
export const NavBar = ({ canGoBack, onBack }: NavBarProps) => {
    const insets = useSafeAreaInsets();

    return (
        <NavBarComponent
            safeAreaInsetTop={insets.top}
            userComponent={
                <NavBarUser
                    user={null}
                    safeAreaInsetTop={insets.top}
                    onLogin={() => {}}
                    onLogout={() => {}}
                    onBindPreLoginState={() => {}}
                />
            }
            canGoBack={canGoBack}
            onBack={onBack}
        />
    );
};
