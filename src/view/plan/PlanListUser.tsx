import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Plan } from "src/domain/models/Plan";
import { User } from "src/domain/models/User";
import { PlanList } from "src/view/plan/PlanList";

type Props = {
    user: User | null;
    plans: Plan[];
    isLoading?: boolean;
};

export function PlanListUser({ user, plans, isLoading = false }: Props) {
    const { t } = useTranslation();
    if (!user) return <></>;

    return (
        <PlanList plans={plans} isLoading={isLoading}>
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
        </PlanList>
    );
}
