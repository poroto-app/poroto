import { Center, HStack } from "@chakra-ui/react";
import { CSSProperties, ReactNode } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { Size } from "src/view/constants/size";
import { zIndex } from "src/view/constants/zIndex";

type Props = {
    visible?: boolean;
    children?: ReactNode;
};

const transitionStyles: {
    [key in TransitionStatus]: CSSProperties | undefined;
} = {
    entering: { opacity: 0, transform: "translateY(50%)" },
    entered: { opacity: 1, transform: "translateY(0)" },
    exiting: { opacity: 0, transform: "translateY(50%)" },
    exited: { opacity: 0, visibility: "hidden" },
    unmounted: { opacity: 0, visibility: "hidden" },
};

export function PlanFooter({ visible = true, children }: Props) {
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
                <Center
                    backgroundColor="white"
                    borderTop="1px solid rgba(0,0,0,.1)"
                    h={Size.PlanCandidate.Footer.h + "px"}
                    w="100%"
                    position="fixed"
                    px="16px"
                    py="16px"
                    bottom={0}
                    left={0}
                    right={0}
                    zIndex={zIndex.footer}
                    transition="all 0.2s ease-in-out"
                    style={{
                        ...transitionStyles[state],
                    }}
                >
                    <HStack w="100%" maxW="var(--max-page-width)" h="100%">
                        {children}
                    </HStack>
                </Center>
            )}
        </Transition>
    );
}
