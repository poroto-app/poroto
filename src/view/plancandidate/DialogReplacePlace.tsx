import { Place } from "src/domain/models/Place";
import { DialogRelatedPlaces } from "src/view/plancandidate/DialogRelatedPlaces";

type Props = {
    placesInPlan: Place[];
    placesToReplace: Place[] | null;
    placeIdToReplace: string | null;
    isDialogVisible: boolean;
    isReplacingPlace: boolean;
    onReplacePlace: (props: {
        placeIdToBeReplaced: string;
        placeIdToReplace: string;
    }) => void;
    onCloseDialog;
};

export function DialogReplacePlace({
    placesInPlan,
    placesToReplace,
    placeIdToReplace,
    isDialogVisible,
    isReplacingPlace,
    onReplacePlace,
    onCloseDialog,
}: Props) {
    return (
        <DialogRelatedPlaces
            visible={isDialogVisible}
            dialogTitle={`「${
                placesInPlan.find((p) => p.id === placeIdToReplace)?.name
            }」に関連する場所`}
            titleConfirmUpdate={({ selectedPlaceId }) => (
                <>
                    「
                    <b>
                        {
                            placesInPlan.find((p) => p.id === placeIdToReplace)
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
            onClickRelatedPlace={(placeId) =>
                placeIdToReplace &&
                onReplacePlace({
                    placeIdToReplace: placeIdToReplace,
                    placeIdToBeReplaced: placeId,
                })
            }
            onClose={onCloseDialog}
        />
    );
}
