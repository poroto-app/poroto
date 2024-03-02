import { useToast } from "@chakra-ui/react";
import { reduxAuthSelector } from "src/redux/auth";
import { reduxPlanSelector, updatePlaceLikeInPlan } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";

export const useUserPlan = () => {
    const dispatch = useAppDispatch();
    const { likePlaceIds } = reduxPlanSelector();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const toast = useToast();

    const updateLikePlace = ({
        planId,
        placeId,
        like,
    }: {
        planId: string;
        placeId: string;
        like: boolean;
    }) => {
        if (!user || !firebaseIdToken) {
            // TODO: ダイアログで表示する
            toast({
                title: "ログインすると気に入った場所を保存することができます。",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        dispatch(
            updatePlaceLikeInPlan({
                planId,
                placeId,
                like,
                userId: user.id,
                firebaseIdToken,
            })
        );
    };

    return {
        userId: user?.id,
        firebaseIdToken,
        likePlaceIds,
        updateLikePlace,
    };
};
