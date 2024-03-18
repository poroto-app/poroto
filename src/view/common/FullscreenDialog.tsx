import { Box } from "@chakra-ui/react";
import { CSSProperties, ReactNode, useEffect } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { zIndex } from "src/view/constants/zIndex";
import styled from "styled-components";

type Props = {
    position?: DialogPosition;
    visible: boolean;
    children: ReactNode;
    onClickOutside?: () => void;
    padding?: string | number;
    paddingX?: string | number;
    paddingY?: string | number;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
};

// TODO: スワイプインする
export const DialogPositions = {
    CENTER: "center",
    BOTTOM: "bottom",
};
export type DialogPosition =
    (typeof DialogPositions)[keyof typeof DialogPositions];

const transitionStyles: {
    [key in TransitionStatus]: CSSProperties | undefined;
} = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, visibility: "hidden" },
    unmounted: { opacity: 0, visibility: "hidden" },
};

export function FullscreenDialog({
    position = DialogPositions.CENTER,
    visible,
    width,
    height,
    maxHeight = "100%",
    maxWidth = "100%",
    onClickOutside,
    padding,
    paddingX,
    paddingY,
    children,
}: Props) {
    // スクロールしたときに画面が動かないようにする
    const fixScroll = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.right = "0";
        document.body.style.left = "0";
        document.body.style.bottom = "0";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
    };

    const resetFixScroll = () => {
        const scrollY = parseInt(document.body.style.top || "0");
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.right = "";
        document.body.style.left = "";
        document.body.style.bottom = "";
        // MEMO: これをやらないと、スクロール位置が元に戻らない
        window.scrollTo(0, scrollY * -1);
    };

    useEffect(() => {
        // コンポーネントが表示されなくなったときに、スクロール位置を元に戻す
        return () => {
            resetFixScroll();
        };
    }, []);

    useEffect(() => {
        if (visible) {
            fixScroll();
        } else {
            resetFixScroll();
        }
    }, [visible]);

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Transition
            in={visible}
            timeout={{
                enter: 200,
                exit: 200,
            }}
        >
            {(state) => (
                <FullscreenDialogWrapper
                    style={{
                        ...transitionStyles[state],
                    }}
                >
                    <Container position={position}>
                        {/* MEMO: FullscreenDialogWrapper にonClick属性をつけて、zIndex:9999 にしても、childrenに触れたときにonClickOutsideが発火してしまう*/}
                        <TouchDetector onClick={onClickOutside} />
                        <Box
                            zIndex={9999}
                            px={paddingX ?? padding}
                            py={paddingY ?? padding}
                            w={width}
                            h={height}
                            maxW={maxWidth}
                            maxH={maxHeight}
                        >
                            {children}
                        </Box>
                    </Container>
                </FullscreenDialogWrapper>
            )}
        </Transition>
    );
}

const FullscreenDialogWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ${zIndex.dialog};
    transition: all 0.2s linear;
`;

const Container = styled.div<{ position: DialogPosition }>`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: ${({ position }) =>
        position === DialogPositions.BOTTOM ? "flex-end" : "center"};
`;

const TouchDetector = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;
