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
            dialogTitle={`「${
                placesInPlan.find((p) => p.id === placeIdToBeReplaced)?.name
            }」に関連する場所`}
            titleConfirmUpdate={({ selectedPlaceId }) => (
                <>
                    「
                    <b>
                        {
                            placesInPlan.find((p) => p.id === placeIdToBeReplaced)
                                ?.name
                        }
                    </b>
                    」 を 「
                    <b>
                        {
                            placesToReplace.find(
                                (p) => p.id === selectedPlaceId
                            )?.name
                        }
                    </b>
                    」 と入れ替えますか？
                </>
            )}
            places={placesToReplace}
            updating={isReplacingPlace}
            buttonLabelSelectPlace="この場所と入れ替える"
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
