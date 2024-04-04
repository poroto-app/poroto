import { Place } from "src/domain/models/Place";
import { PlacesWithCategory } from "src/domain/models/PlacesWithCategory";
import { Transition } from "src/domain/models/Transition";
import { DialogRelatedPlaces } from "src/view/plancandidate/DialogRelatedPlaces";

type Props = {
    placesRecommended: Place[];
    placesWithCategories: PlacesWithCategory[];
    transitions: Transition[];
    isDialogVisible: boolean;
    isAddingPlace: boolean;
    onAddPlaceToPlan: (props: { placeIdToAdd: string }) => void;
    onCloseDialog: () => void;
};

export function DialogAddPlace(
    {
        placesRecommended,
        placesWithCategories,
        transitions,
        isDialogVisible,
        isAddingPlace,
        onAddPlaceToPlan,
        onCloseDialog,
    }: Props
) {
    return (
        <DialogRelatedPlaces
            visible={isDialogVisible}
            titleConfirmScreen="この場所を追加しますか？"
            titleSelectScreen="プランに新しい場所を追加する"
            placesRecommended={placesRecommended}
            placesWithCategories={placesWithCategories}
            transitions={transitions}
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
