import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
    position?: DialogPosition;
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

export function FullscreenDialog({
    position = DialogPositions.CENTER,
    width,
    height,
    maxHeight = "100%",
    maxWidth = "100%",
    onClickOutside,
    padding,
    children,
}: Props) {
    return (
        <FullscreenDialogWrapper>
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
    );
}

const FullscreenDialogWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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
