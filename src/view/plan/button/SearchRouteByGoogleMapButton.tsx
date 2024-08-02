import { Link } from "solito/link";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { Plan } from "src/domain/models/Plan";
import { generateGoogleMapUrl } from "src/domain/util/googleMap";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";

type Props = {
    plan: Plan;
    currentLocation: GeoLocation | null;
    createdBasedOnCurrentLocation?: boolean | null;
};

export function SearchRouteByGoogleMapButton({
    plan,
    currentLocation,
    createdBasedOnCurrentLocation,
}: Props) {
    const { t } = useAppTranslation();
    const startLocationOfRoute =
        currentLocation && createdBasedOnCurrentLocation
            ? currentLocation
            : undefined;

    return (
        <Link
            href={generateGoogleMapUrl({
                places: plan.places,
                startLocation: startLocationOfRoute,
            })}
            target="_blank"
            viewProps={{ style: { width: "100%" } }}
        >
            <PlanActionButton
                text={t("plan:searchRouteOnGoogleMaps")}
                imageUrl="/images/google_map_logo.png"
            />
        </Link>
    );
}
