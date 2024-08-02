import { Box, Text, VStack } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { Padding } from "src/constant/padding";
import { Plan } from "src/domain/models/Plan";
import { hasValue } from "src/domain/util/null";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import TravelModeIcon from "src/view/assets/svg/travel_mode.svg";
import { PlanList } from "src/view/plan/PlanList";
import { PlanListSectionTitleSavedPlans } from "src/view/top/PlanListSectionTitle";

type Props = {
    plans: Plan[] | null;
    isLoading: boolean;
};

const transitionStyles: {
    [key in TransitionStatus]: CSSProperties | undefined;
} = {
    entering: { opacity: 0.3, transform: "scaleY(90%) translateY(-5%)" },
    entered: { opacity: 1, transform: "scaleY(100%) translateY(0)" },
    exiting: { opacity: 0, height: 0 },
    exited: { opacity: 0, visibility: "hidden" },
    unmounted: { opacity: 0, visibility: "hidden" },
};

export function UsersPlan({ plans, isLoading }: Props) {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Transition
            in={isLoading || hasValue(plans)}
            timeout={{
                enter: 200,
                exit: 0,
            }}
        >
            {(state) =>
                state === "exited" ? (
                    <></>
                ) : (
                    <Box
                        w="100%"
                        style={{
                            transition: "all 0.2s ease-in",
                            ...transitionStyles[state],
                        }}
                    >
                        <PlanList
                            plans={plans}
                            isLoading={isLoading}
                            empty={<Empty />}
                            numPlaceHolders={6}
                            grid={false}
                            wrapTitle={false}
                            showAuthor={false}
                            px={Padding.p16}
                            ads={false}
                        >
                            <PlanListSectionTitleSavedPlans />
                        </PlanList>
                    </Box>
                )
            }
        </Transition>
    );
}

function Empty() {
    const { t } = useAppTranslation();
    return (
        <VStack
            w="100%"
            h="200px"
            px={Padding.p16 + "px"}
            spacing={{
                base: "16px",
                md: "32px",
            }}
            color="rgba(0,0,0,.7)"
            justifyContent="center"
            flexDirection={{
                base: "column",
                md: "row",
            }}
        >
            <TravelModeIcon
                viewBox="0 0 850 520.84494"
                style={{
                    height: "100%",
                    width: "auto",
                }}
            />
            <VStack spacing={0} alignItems="flex-start">
                <Text fontSize="1.2rem" fontWeight="bold">
                    {t("plan:savedPlansEmptyTitle")}
                </Text>
                <Text>{t("plan:savedPlansEmptyDescription")}</Text>
            </VStack>
        </VStack>
    );
}
