import { MdOutlineExplore } from "react-icons/md";
import { Plan } from "src/domain/models/Plan";
import { isPC } from "src/view/constants/userAgent";
import {
    LocationPermission,
    LocationPermissions,
} from "src/view/hooks/useLocation";
import { PlanList } from "src/view/plan/PlanList";
import { LocationUnavailable } from "src/view/top/LocationUnavailable";
import { NearbyPlansNotFound } from "src/view/top/NearbyPlansNotFound";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

type Props = {
    plans: Plan[] | null;
    locationPermission: LocationPermission | null;
    isFetchingNearbyPlans: boolean;
    isFetchingCurrentLocation: boolean;
    onRequestFetchNearByPlans: () => void;
};

export function NearbyPlanList({
    plans,
    locationPermission,
    isFetchingNearbyPlans,
    isFetchingCurrentLocation,
    onRequestFetchNearByPlans,
}: Props) {
    return (
        <PlanList
            plans={plans}
            empty={
                <Empty
                    plans={plans}
                    locationPermission={locationPermission}
                    isFetchingCurrentLocation={isFetchingCurrentLocation}
                    onRequestFetchNearByPlans={onRequestFetchNearByPlans}
                />
            }
            isLoading={isFetchingNearbyPlans}
            numPlaceHolders={isPC ? 3 : 1}
        >
            <PlanListSectionTitle
                title="近くのプラン"
                icon={MdOutlineExplore}
            />
        </PlanList>
    );
}

export function Empty({
    plans,
    locationPermission,
    isFetchingCurrentLocation,
    onRequestFetchNearByPlans,
}: {
    plans: Plan[] | null;
    locationPermission: LocationPermission | null;
    isFetchingCurrentLocation: boolean;
    onRequestFetchNearByPlans: () => void;
}) {
    if (
        locationPermission !== LocationPermissions.GRANTED ||
        isFetchingCurrentLocation
    ) {
        return (
            <LocationUnavailable
                locationPermission={locationPermission}
                isUpdating={isFetchingCurrentLocation}
                onClickSwitch={onRequestFetchNearByPlans}
            />
        );
    }

    if (!!plans && plans.length === 0) {
        return <NearbyPlansNotFound />;
    }
}
