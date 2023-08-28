import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Notify from "src/view/assets/svg/notify.svg";
import { FailurePage } from "src/view/common/FailurePage";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Colors } from "src/view/constants/color";
import { Routes } from "src/view/constants/router";

type Props = {
    navBar?: boolean;
};

export function ErrorPage({ navBar }: Props) {
    const router = useRouter();

    const handleReload = () => {
        router.reload();
    };

    return (
        <FailurePage
            navBar={navBar}
            title="505"
            statusMessage="Server Error"
            statusDescription="サーバーでエラーが発生しました。"
            image={
                <Notify
                    viewBox="0 0 790 512.20805"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            }
            actions={
                <>
                    <Button
                        w="100%"
                        variant="outline"
                        color={Colors.primary["400"]}
                        borderWidth="2px"
                        borderColor={Colors.primary["400"]}
                        borderRadius="50px"
                        onClick={handleReload}
                    >
                        再読込
                    </Button>
                    <Link
                        href={Routes.home}
                        w="100%"
                        _hover={{ textDecoration: "none" }}
                    >
                        <RoundedButton>ホームに戻る</RoundedButton>
                    </Link>
                </>
            }
        />
    );
}
