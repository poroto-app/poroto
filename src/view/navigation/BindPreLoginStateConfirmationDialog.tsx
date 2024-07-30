import { useState } from "react";
import { Padding } from "src/constant/padding";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { OnClickHandler } from "src/types/handler";
import Awesome from "src/view/assets/svg/awesome.svg";
import Balloon from "src/view/assets/svg/balloons.svg";
import Notify from "src/view/assets/svg/notify.svg";
import Party from "src/view/assets/svg/party.svg";
import { AppTrans } from "src/view/common/AppTrans";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Button, Spinner, Text, XStack, YStack } from "tamagui";

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
            padding={Padding.p8}
            onClickOutside={() => {
                if (bindingRequestStatus !== RequestStatuses.PENDING)
                    onClose?.();
            }}
        >
            <RoundedDialog>
                <YStack
                    px={Padding.p32}
                    py={Padding.p32}
                    gap={Padding.p24}
                    alignItems="center"
                >
                    <DialogBody
                        bindingRequestStatus={bindingRequestStatus}
                        isCanceled={isCanceled}
                        onClickYes={onClickYes}
                        onCanceled={() => setIsCanceled(true)}
                        onClose={onClose}
                    />
                </YStack>
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
    const { t } = useAppTranslation();
    return (
        <>
            <YStack>
                <Text textAlign="center" fontSize={24} fontWeight="bold">
                    <AppTrans i18nKey={"account:retainDataBeforeLoginTitle"} />
                </Text>
                <Text>{t("account:retainDataBeforeLoginDescription")}</Text>
            </YStack>
            <Balloon
                viewBox="0 0 571.75671 700.46347"
                style={{
                    height: 200,
                }}
            />
            <YStack w="100%" gap={Padding.p4}>
                <RoundedButton onClick={onClickYes}>
                    {t("account:retainData")}
                </RoundedButton>
                <Button chromeless onPress={onCanceled}>
                    {t("common:cancel")}
                </Button>
            </YStack>
        </>
    );
}

function Cancel({ onClose }: { onClose?: OnClickHandler }) {
    const { t } = useAppTranslation();
    return (
        <>
            <Text textAlign="center" fontSize={24} fontWeight="bold">
                <AppTrans i18nKey={"account:retainDataCanceledMessage"} />
            </Text>
            <Awesome
                viewBox="0 0 616.25771 629"
                style={{
                    height: 200,
                }}
            />
            <RoundedButton outlined color="black" onClick={onClose}>
                {t("common:close")}
            </RoundedButton>
        </>
    );
}

function Pending() {
    const { t } = useAppTranslation();
    return (
        <>
            <Text textAlign="center" fontSize={24} fontWeight="bold">
                <AppTrans i18nKey={"account:retainingData"} />
            </Text>
            <XStack h={200} alignItems="center" justifyContent="center">
                <Spinner color="#84A6FF" size="large" />
            </XStack>
            <Text>{t("account:retainingDataWaitMessage")}</Text>
        </>
    );
}

function Success({ onClose }: { onClose?: OnClickHandler }) {
    const { t } = useAppTranslation();
    return (
        <>
            <Text textAlign="center" fontSize={24} fontWeight="bold">
                {t("account:retainDataSuccess")}
            </Text>
            <Party
                viewBox="0 0 1001.27346 688.36187"
                style={{
                    height: 200,
                }}
            />
            <RoundedButton outlined color="black" onClick={onClose}>
                {t("common:close")}
            </RoundedButton>
        </>
    );
}

function Error({ onClose }: { onClose?: OnClickHandler }) {
    const { t } = useAppTranslation();
    return (
        <>
            <YStack>
                <Text textAlign="center" fontSize={24} fontWeight="bold">
                    {t("account:retainDataFailed")}
                </Text>
                <Text color="rgba(0,0,0,.65)">
                    <AppTrans i18nKey={"account:retainDataRetryLaterMessage"} />
                </Text>
            </YStack>
            <Notify
                viewBox="0 0 790 512.20805"
                style={{
                    height: 200,
                    margin: "32px 0",
                }}
            />
            <RoundedButton outlined color="black" onClick={onClose}>
                {t("common:close")}
            </RoundedButton>
        </>
    );
}
