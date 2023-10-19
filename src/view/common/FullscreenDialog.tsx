import { Box } from "@chakra-ui/react";
import { CSSProperties, ReactNode } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import styled from "styled-components";

type Props = {
    position?: DialogPosition;
    visible: boolean;
    children: ReactNode;
    onClickOutside?: () => void;
    padding?: string;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
};

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
    children,
}: Props) {
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
                            padding={padding}
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
    z-index: 10;
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
