import { PlanListProps } from "src/types/props";
import { PlanListHorizontalLayout } from "src/view/plan/PlanListHorizontalLayout.native";

export function PlanListGridLayout(props: PlanListProps) {
    return <PlanListHorizontalLayout {...props} grid={true} />;
}
