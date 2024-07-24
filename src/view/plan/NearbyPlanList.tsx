import { useTranslation } from "next-i18next";
import { MdOutlineExplore } from "react-icons/md";
import { isPC } from "src/constant/userAgent";
import { Plan } from "src/domain/models/Plan";
import { LocationPermission, LocationPermissions } from "src/hooks/useLocation";
import { PlanList } from "src/view/plan/PlanList";
import { LocationUnavailable } from "src/view/top/LocationUnavailable";
import { NearbyPlansNotFound } from "src/view/top/NearbyPlansNotFound";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

type Props = {
    plans: Plan[] | null;
    locationPermission: LocationPermission | null;
    px?: string | number;
    isFetchingNearbyPlans: boolean;
    isFetchingCurrentLocation: boolean;
    onRequestFetchNearByPlans: () => void;
};

export function NearbyPlanList({
    plans,
    locationPermission,
    px,
    isFetchingNearbyPlans,
    isFetchingCurrentLocation,
    onRequestFetchNearByPlans,
}: Props) {
    const { t } = useTranslation();
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
            px={px}
        >
            <PlanListSectionTitle
                title={t("plan:nearbyPlans")}
                icon={MdOutlineExplore}
                px={px}
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
