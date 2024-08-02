import { useToastController } from "@tamagui/toast";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { reduxAuthSelector } from "src/redux/auth";
import { reduxPlanSelector, updatePlaceLikeInPlan } from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";

export const useUserPlan = () => {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const { likePlaceIds } = reduxPlanSelector();
    const { user, firebaseIdToken } = reduxAuthSelector();
    const toast = useToastController();

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
            toast.show(t("place:loginToSaveFavoritePlace"), {
                duration: 3000,
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
