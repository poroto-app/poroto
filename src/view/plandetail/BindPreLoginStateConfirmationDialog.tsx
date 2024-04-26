import { Button, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import Awesome from "src/view/assets/svg/awesome.svg";
import Balloon from "src/view/assets/svg/balloons.svg";
import Notify from "src/view/assets/svg/notify.svg";
import Party from "src/view/assets/svg/party.svg";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { OnClickHandler } from "src/view/types/handler";

type Props = {
    visible: boolean;
    bindingRequestStatus?: RequestStatus;
    onClickYes?: OnClickHandler;
    onClose?: OnClickHandler;
};

export function BindPreLoginStateConfirmationDialog({
    visible,
    bindingRequestStatus,
    onClickYes,
    onClose,
}: Props) {
    const [isCanceled, setIsCanceled] = useState(false);
    return (
        <FullscreenDialog
            visible={visible}
            padding="8px"
            onClickOutside={() => {
                if (bindingRequestStatus !== RequestStatuses.PENDING)
                    onClose?.();
            }}
        >
            <RoundedDialog>
                <VStack px="32px" py="32px" spacing="24px">
                    <DialogBody
                        bindingRequestStatus={bindingRequestStatus}
                        isCanceled={isCanceled}
                        onClickYes={onClickYes}
                        onCanceled={() => setIsCanceled(true)}
                        onClose={onClose}
                    />
                </VStack>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function DialogBody({
    bindingRequestStatus,
    isCanceled,
    onClickYes,
    onCanceled,
    onClose,
}: {
    bindingRequestStatus?: RequestStatus;
    isCanceled: boolean;
    onClickYes: () => void;
    onCanceled: () => void;
    onClose?: OnClickHandler;
}) {
    if (isCanceled) {
        return <Cancel onClose={onClose} />;
    }

    if (!bindingRequestStatus) {
        return <Confirm onClickYes={onClickYes} onCanceled={onCanceled} />;
    }

    if (bindingRequestStatus === RequestStatuses.PENDING) {
        return <Pending />;
    }

    if (bindingRequestStatus === RequestStatuses.FULFILLED) {
        return <Success onClose={onClose} />;
    }

    return <Error onClose={onClose} />;
}

function Confirm({
    onClickYes,
    onCanceled,
}: {
    onClickYes?: () => void;
    onCanceled: () => void;
}) {
    return (
        <>
            <VStack>
                <Text textAlign="center" fontSize="24px" fontWeight="bold">
                    ログイン前の状態を
                    <br />
                    引き継ぎますか？
                </Text>
                <Text>
                    「保存したプラン」や「いいね」した記録を引き継ぐことができます。
                </Text>
            </VStack>
            <Balloon
                viewBox="0 0 571.75671 700.46347"
                style={{
                    height: 200,
                }}
            />
            <VStack w="100%">
                <RoundedButton onClick={onClickYes}>引き継ぐ</RoundedButton>
                <Button onClick={onCanceled} variant="text">
                    キャンセル
                </Button>
            </VStack>
        </>
    );
}

function Cancel({ onClose }: { onClose?: OnClickHandler }) {
    return (
        <>
            <Text textAlign="center" fontSize="24px" fontWeight="bold">
                引き継ぎは
                <br />
                ログインメニューから
                <br />
                いつでもできます！
            </Text>
            <Awesome
                viewBox="0 0 616.25771 629"
                style={{
                    height: 200,
                }}
            />
            <RoundedButton outlined color="black" onClick={onClose}>
                とじる
            </RoundedButton>
        </>
    );
}

function Pending() {
    return (
        <>
            <Text textAlign="center" fontSize="24px" fontWeight="bold">
                データを
                <br />
                引き継いでいます...
            </Text>
            <Center h="200px">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#84A6FF"
                    size="xl"
                />
            </Center>
            <Text>しばらくお待ちください！</Text>
        </>
    );
}

function Success({ onClose }: { onClose?: OnClickHandler }) {
    return (
        <>
            <Text textAlign="center" fontSize="24px" fontWeight="bold">
                引き継ぎが成功しました！
            </Text>
            <Party
                viewBox="0 0 1001.27346 688.36187"
                style={{
                    height: 200,
                }}
            />
            <RoundedButton outlined color="black" onClick={onClose}>
                とじる
            </RoundedButton>
        </>
    );
}

function Error({ onClose }: { onClose?: OnClickHandler }) {
    return (
        <>
            <VStack>
                <Text textAlign="center" fontSize="24px" fontWeight="bold">
                    引き継ぎに失敗しました
                </Text>
                <Text color="rgba(0,0,0,.65)">
                    しばらく時間をおいて再度お試しください。
                    <br />
                    引き継ぎはログインメニューからいつでもできます！
                </Text>
            </VStack>
            <Notify
                viewBox="0 0 790 512.20805"
                style={{
                    height: 200,
                    margin: "32px 0",
                }}
            />
            <RoundedButton outlined color="black" onClick={onClose}>
                とじる
            </RoundedButton>
        </>
    );
}
