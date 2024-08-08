import { ReactNode } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { zIndex } from "src/constant/zIndex";
import { isWeb, XStack } from "tamagui";

type Props = {
    visible?: boolean;
    children?: ReactNode;
};

export function PlanFooter({ visible = true, children }: Props) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const position: "absolute" = isWeb ? "fixed" : "absolute";

    return (
        <>
            {visible && (
                <XStack
                    backgroundColor="white"
                    borderTopWidth={1}
                    borderTopColor="rgba(0,0,0,.1)"
                    h={Size.PlanFooter.h}
                    w="100%"
                    px={Padding.p16}
                    py={Padding.p16}
                    position={position}
                    bottom={0}
                    left={0}
                    right={0}
                    zIndex={zIndex.footer}
                    animation="quicker"
                    enterStyle={{
                        opacity: 0,
                        y: Size.PlanFooter.h / 2,
                    }}
                    exitStyle={{
                        opacity: 1,
                        y: Size.PlanFooter.h / 2,
                    }}
                >
                    <XStack
                        w="100%"
                        maxWidth={Size.mainContentWidth}
                        h="100%"
                        gap={Padding.p8}
                    >
                        {children}
                    </XStack>
                </XStack>
            )}
        </>
    );
}
