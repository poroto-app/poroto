import {FailurePage} from "src/view/common/FailurePage";
import Lost from "src/view/assets/svg/lost.svg";
import {Link} from "@chakra-ui/next-js";
import {Routes} from "src/view/constants/router";
import {RoundedButton} from "src/view/common/RoundedButton";

export function CouldNotFindAnyPlace() {
    return <FailurePage
        title="Sorry"
        statusDescription="近くの場所を探すことができませんでした。"
        image={<Lost
            viewBox="0 0 885.20079 708.31655"
            style={{
                width: "100%",
                height: "100%",
            }}
        />}
        actions={
            <Link
                href={Routes.home}
                w="100%"
                _hover={{ textDecoration: "none" }}
            >
                <RoundedButton>ホームに戻る</RoundedButton>
            </Link>
        }
    />;
}