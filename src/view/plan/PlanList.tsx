import { Text, VStack } from "@chakra-ui/react";
import { Plan } from "src/domain/models/Plan";
import { Routes } from "src/view/constants/router";
import { PlanPreview } from "src/view/plan/PlanPreview";

type Props = {
    title: string;
    plans: Plan[] | null;
};

export function PlanList({ plans, title }: Props) {
    return (
        <VStack w="100%" spacing={4}>
            <Text
                as="h2"
                fontSize="20px"
                fontWeight="bold"
                w="100%"
                maxW="600px"
                textAlign="start"
            >
                {title}
            </Text>
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
