import { Place } from "src/domain/models/Place";
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
    return (
        <DialogRelatedPlaces
            visible={isDialogVisible}
            titleSelectScreen={`「${
                placesInPlan.find((p) => p.id === placeIdToBeReplaced)?.name
            }」に関連する場所`}
            titleConfirmScreen="この場所と入れ替えますか？"
            places={placesToReplace}
            updating={isReplacingPlace}
            buttonLabelUpdatePlace="入れ替える"
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
