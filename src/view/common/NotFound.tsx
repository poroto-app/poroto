import { Link } from "@chakra-ui/next-js";
import { Image } from "@chakra-ui/react";
import { FailurePage } from "src/view/common/FailurePage";
import { Routes } from "src/view/constants/router";
import { RoundedButton } from "./RoundedButton";

export const NotFound = () => {
    return (
        <FailurePage
            title="404"
            statusMessage="Not Found"
            statusDescription="お探しのページが見つかりませんでした。"
            image={
                <Image
                    w="100%"
                    objectFit="cover"
                    src="/images/404.png"
                    alt="Not Found"
                />
            }
            actions={
                <Link
                    href={Routes.home}
                    w="100%"
                    _hover={{ textDecoration: "none" }}
                >
                    <RoundedButton>ホームに戻る</RoundedButton>
                </Link>
            }
        />
    );
};
