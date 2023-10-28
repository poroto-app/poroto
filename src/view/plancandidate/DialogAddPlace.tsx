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
            dialogTitle="プランに新しい場所を追加する"
            places={placesToAdd}
            updating={isAddingPlace}
            onClose={onCloseDialog}
            onClickRelatedPlace={(placeId) =>
                onAddPlaceToPlan({
                    placeIdToAdd: placeId,
                })
            }
            titleConfirmUpdate={({ selectedPlaceId }) => (
                <>
                    {placesToAdd.find((p) => p.id === selectedPlaceId)?.name}
                    をプランに追加しますか？
                </>
            )}
        />
    );
}
