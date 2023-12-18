import { Place } from "src/domain/models/Place";
import { DialogRelatedPlaces } from "src/view/plancandidate/DialogRelatedPlaces";

type Props = {
    placesToAdd: Place[] | null;
    isDialogVisible: boolean;
    isAddingPlace: boolean;
    onAddPlaceToPlan: (props: { placeIdToAdd: string }) => void;
    onCloseDialog: () => void;
};

export function DialogAddPlace({
    placesToAdd,
    isDialogVisible,
    isAddingPlace,
    onAddPlaceToPlan,
    onCloseDialog,
}: Props) {
    return (
        <DialogRelatedPlaces
            visible={isDialogVisible}
            titleConfirmScreen="この場所を追加しますか？"
            titleSelectScreen="プランに新しい場所を追加する"
            places={placesToAdd}
            updating={isAddingPlace}
            buttonLabelUpdatePlace="追加"
            onClose={onCloseDialog}
            onClickRelatedPlace={(placeId) =>
                onAddPlaceToPlan({
                    placeIdToAdd: placeId,
                })
            }
        />
    );
}
