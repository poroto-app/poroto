import { Link } from "@chakra-ui/next-js";
import { Image } from "@chakra-ui/react";
import { FailurePage } from "src/view/common/FailurePage";
import { Routes } from "src/view/constants/router";
import { RoundedButton } from "../common/RoundedButton";

export const PlanGenerationFailure = () => {
    return (
        <FailurePage
            title="Sorry"
            statusDescription="プランを作成することができませんでした。"
            image={
                <Image
                    w="100%"
                    objectFit="cover"
                    src="/images/NotFound.jpg"
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
