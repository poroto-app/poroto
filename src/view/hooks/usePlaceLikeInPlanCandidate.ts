import { useEffect, useState } from "react"
import { reduxPlanCandidateSelector, updateLikeAtPlaceInPlanCandidate } from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlaceLikeInPlanCandidate = () => {
    const dispatch = useAppDispatch();
    const { likedPlaceIds, createPlanSession } = reduxPlanCandidateSelector();

    // 瞬時にlikeを反映できるようにするために、hooksでも管理する
    const [likedPlaceIdsInPlanCandidate, setLikePlaceInPlanCandidate] = useState(likedPlaceIds);

    const updateLikeAtPlace = ({placeId, like}:{placeId: string, like: boolean}) => {
        if(!createPlanSession) return;
        dispatch(updateLikeAtPlaceInPlanCandidate({placeId, like, planCandidateId: createPlanSession}));

        if (like) {
            setLikePlaceInPlanCandidate([...likedPlaceIdsInPlanCandidate, placeId]);
        } else {
            setLikePlaceInPlanCandidate(likedPlaceIdsInPlanCandidate.filter((id) => id !== placeId));
        }
    }

    useEffect(() => {
        setLikePlaceInPlanCandidate(likedPlaceIds);
    }, [likedPlaceIds]);

    return {
        likedPlaceIdsInPlanCandidate,
        updateLikeAtPlace,
    }
}