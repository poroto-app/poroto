import { Box, Button, VStack } from "@chakra-ui/react";
import { forwardRef, ReactNode, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { Place } from "src/domain/models/Place";
import { ReorderablePlaceList } from "src/view/plan/edit/ReorderablePlaceList";
import styled from "styled-components";

type Props = {
    visible: boolean;
    onClosed: () => void;
    places: Place[];
    onReorderPlaces: (places: Place[]) => void;
};

export function PlanEditorDialog({
    visible,
    places,
    onReorderPlaces,
    onClosed,
}: Props) {
    const dialogRef = useRef<HTMLDivElement>();

    return (
        <Dialog visible={visible} onClosed={onClosed} ref={dialogRef}>
            <VStack spacing={4} w="100%" h="100%">
                <Box
                    backgroundColor="white"
                    borderRadius="5px"
                    px="8px"
                    py="8px"
                    w="100%"
                    flex={1}
                >
                    <ReorderablePlaceList
                        places={places}
                        onReorderPlaces={onReorderPlaces}
                        parentRef={dialogRef}
                    />
                </Box>
                <Button
                    w="100%"
                    backgroundColor="#5F553B"
                    color="white"
                    variant="solid"
                >
                    保存
                </Button>
            </VStack>
        </Dialog>
    );
}

const Dialog = forwardRef<
    HTMLDivElement,
    {
        children: ReactNode;
        onClosed: () => void;
        visible: boolean;
    }
>(function DialogComponent({ visible, onClosed, children }, ref) {
    return (
        // TODO: 別のライブラリに置き換える
        // react-transition-groupはReact18に対応していない
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Transition in={visible} timeout={400}>
            {(state) => (
                <DialogWrapper onClick={onClosed} state={state}>
                    <BottomSheet id="hoge" state={state} ref={ref}>
                        {children}
                    </BottomSheet>
                </DialogWrapper>
            )}
        </Transition>
    );
});

const DialogWrapper = styled.div<{ state: TransitionStatus }>`
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 4px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: ${({ state }) => (isEntering(state) ? 1 : 0)};
    transition: opacity 0.4s ease;
    visibility: ${({ state }) => (state === "exited" ? "hidden" : "visible")};
`;

const BottomSheet = styled.div<{ state: TransitionStatus }>`
    background-color: #f7f7f8;
    padding: 16px;
    border-radius: 10px;
    height: 400px;
    max-width: var(--max-page-width);
    width: 100%;
    opacity: ${({ state }) => (isEntering(state) ? 1 : 0)};
    transform: translateY(${({ state }) => (isEntering(state) ? 0 : 110)}%);
    max-height: 100%;
    transition: transform 0.4s ease-in-out;
`;

const isEntering = (state: TransitionStatus) =>
    state === "entering" || state === "entered";
