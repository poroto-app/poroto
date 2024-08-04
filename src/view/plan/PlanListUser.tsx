import { Text } from "@chakra-ui/react";
import { Plan } from "src/domain/models/Plan";
import { User } from "src/domain/models/User";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { PlanList } from "src/view/plan/PlanList";

type Props = {
    user: User | null;
    plans: Plan[];
    isLoading?: boolean;
};

export function PlanListUser({ user, plans, isLoading = false }: Props) {
    const { t } = useAppTranslation();
    if (!user) return <></>;

    return (
        <PlanList
            plans={plans}
            isLoading={isLoading}
            header={
                <Text
                    as="h2"
                    fontSize="20px"
                    fontWeight="bold"
                    w="100%"
                    maxW="600px"
                    textAlign="center"
                    py="16x"
                >
                    {t("plan:savedPlans")}
                </Text>
            }
        />
    );
}
