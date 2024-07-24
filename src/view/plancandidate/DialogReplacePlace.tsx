import { Place } from "src/domain/models/Place";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { DialogRelatedPlaces } from "src/view/plancandidate/DialogRelatedPlaces";

type Props = {
    placesInPlan: Place[];
    placesToReplace: Place[] | null;
    placeIdToBeReplaced: string | null;
    isDialogVisible: boolean;
    isReplacingPlace: boolean;
    onReplacePlace: (props: {
        placeIdToDeleted: string;
        placeIdToAdd: string;
    }) => void;
    onCloseDialog;
};

export function DialogReplacePlace({
    placesInPlan,
    placesToReplace,
    placeIdToBeReplaced,
    isDialogVisible,
    isReplacingPlace,
    onReplacePlace,
    onCloseDialog,
}: Props) {
    const { t } = useAppTranslation();
    return (
        <DialogRelatedPlaces
            visible={isDialogVisible}
            titleSelectScreen={t("place:relatedPlacesTitle", {
                placeName: placesInPlan.find(
                    (p) => p.id === placeIdToBeReplaced
                )?.name,
            })}
            titleConfirmScreen={t("place:replacePlaceConfirmTitle")}
            placesRecommended={placesToReplace}
            updating={isReplacingPlace}
            buttonLabelUpdatePlace={t("place:replacePlace")}
            onClickRelatedPlace={(placeId) =>
                placeIdToBeReplaced &&
                onReplacePlace({
                    placeIdToAdd: placeId,
                    placeIdToDeleted: placeIdToBeReplaced,
                })
            }
            onClose={onCloseDialog}
        />
    );
}
