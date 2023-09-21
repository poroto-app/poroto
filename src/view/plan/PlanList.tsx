import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Plan } from "src/domain/models/Plan";
import { Routes } from "src/view/constants/router";
import { PlanPreview } from "src/view/plan/PlanPreview";

type Props = {
    children?: ReactNode;
    plans: Plan[] | null;
};

export function PlanList({ plans, children }: Props) {
    return (
        <VStack w="100%" spacing={4}>
            {children}
            <VStack spacing={16} w="100%">
                {plans &&
                    plans.map((plan, index) => (
                        <PlanPreview
                            key={index}
                            link={Routes.plans.plan(plan.id)}
                            plan={plan}
                        />
                    ))}
            </VStack>
        </VStack>
    );
}
