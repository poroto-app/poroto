import { Place } from "src/domain/models/Place";
import { PlacesWithCategory } from "src/domain/models/PlacesWithCategory";
import { Transition } from "src/domain/models/Transition";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";
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

export function DialogAddPlace({
    placesRecommended,
    placesWithCategories,
    transitions,
    isDialogVisible,
    isAddingPlace,
    onAddPlaceToPlan,
    onCloseDialog,
}: Props) {
    const { t } = useAppTranslation();
    return (
        <DialogRelatedPlaces
            visible={isDialogVisible}
            titleConfirmScreen={t("plan:addNewPlaceToPlanConfirmTitle")}
            titleSelectScreen={t("plan:addNewPlaceToPlanTitle")}
            placesRecommended={placesRecommended}
            placesWithCategories={placesWithCategories}
            transitions={transitions}
            updating={isAddingPlace}
            buttonLabelUpdatePlace={t("common:add")}
            onClose={onCloseDialog}
            onClickRelatedPlace={(placeId) =>
                onAddPlaceToPlan({
                    placeIdToAdd: placeId,
                })
            }
        />
    );
}
