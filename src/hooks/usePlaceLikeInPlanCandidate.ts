import { useEffect, useState } from "react";
import { copyObject } from "src/domain/util/object";
import { reduxAuthSelector } from "src/redux/auth";
import {
    reduxPlanCandidateSelector,
    updateLikeAtPlaceInPlanCandidate,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const usePlaceLikeInPlanCandidate = () => {
    const dispatch = useAppDispatch();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const { likedPlaceIds, createPlanSession } = reduxPlanCandidateSelector();

    // 瞬時にlikeを反映できるようにするために、hooksでも管理する
    const [likedPlaceIdsInPlanCandidate, setLikePlaceInPlanCandidate] =
        useState<string[]>([]);

    const updateLikeAtPlace = ({
        placeId,
        like,
    }: {
        placeId: string;
        like: boolean;
    }) => {
        if (!createPlanSession) return;
        dispatch(
            updateLikeAtPlaceInPlanCandidate({
                placeId,
                like,
                planCandidateId: createPlanSession,
                userId: user?.id,
                firebaseIdToken,
            })
        );

        if (like) {
            setLikePlaceInPlanCandidate(
                copyObject([...likedPlaceIdsInPlanCandidate, placeId])
            );
        } else {
            setLikePlaceInPlanCandidate(
                copyObject(
                    likedPlaceIdsInPlanCandidate.filter((id) => id !== placeId)
                )
            );
        }
    };

    useEffect(() => {
        if (!likedPlaceIds) {
            setLikePlaceInPlanCandidate([]);
        } else {
            setLikePlaceInPlanCandidate(copyObject(likedPlaceIds));
        }
    }, [likedPlaceIds]);

    return {
        likedPlaceIdsInPlanCandidate,
        updateLikeAtPlace,
    };
};
