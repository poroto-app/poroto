import { ReactNode, useState } from "react";
import { Dialog, Sheet } from "tamagui";

type Props = {
    position?: DialogPosition;
    visible: boolean;
    children: ReactNode;
    padding?: string | number;
    paddingX?: string | number;
    paddingY?: string | number;
    width?: number | "" | "100%";
    height?: number | "" | "100%";
    maxWidth?: number | "100%";
    maxHeight?: number | "80%" | "100%";
    onClickOutside?: () => void;
};

export const DialogPositions = {
    CENTER: "center",
    BOTTOM: "bottom",
};
export type DialogPosition =
    (typeof DialogPositions)[keyof typeof DialogPositions];

export function FullscreenDialog({
    position: dialogPosition = DialogPositions.CENTER,
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
    const [sheetPosition, setSheetPosition] = useState(0);
    if (dialogPosition === DialogPositions.BOTTOM) {
        return (
            <Sheet
                animation="medium"
                dismissOnSnapToBottom
                forceRemoveScrollEnabled={visible}
                modal
                open={visible}
                snapPoints={height ? [height] : ["80%"]}
                snapPointsMode="mixed"
                position={sheetPosition}
                onPositionChange={setSheetPosition}
                onOpenChange={(open) => {
                    if (!open && onClickOutside) {
                        onClickOutside();
                    }
                }}
            >
                <Sheet.Overlay
                    animation="slow"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Sheet.Handle />
                <Sheet.Frame
                    alignSelf="center"
                    width={width}
                    height={height}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    padding={padding}
                    paddingHorizontal={paddingX}
                    paddingVertical={paddingY}
                >
                    {children}
                </Sheet.Frame>
            </Sheet>
        );
    }

    return (
        <Dialog open={visible}>
            <Dialog.Portal
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems={"center"}
                paddingHorizontal={paddingX ?? padding}
                paddingVertical={paddingY ?? padding}
            >
                <Dialog.Overlay
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    onPress={onClickOutside}
                />
                <Dialog.Content
                    backgroundColor="transparent"
                    width={width}
                    height={height}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    p={0}
                    animateOnly={["transform", "opacity"]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                >
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
