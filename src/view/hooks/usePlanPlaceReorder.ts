import { autoReorderPlacesInPlanCandidate } from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlanPlaceReorder = () => {
    const dispatch = useAppDispatch();

    const handleOptimizeRoute = ({
        planCandidateId,
        planId,
    }: {
        planCandidateId: string;
        planId: string;
    }): void => {
        dispatch(autoReorderPlacesInPlanCandidate({ planId, planCandidateId }));
    };

    return {
        handleOptimizeRoute,
    };
};
