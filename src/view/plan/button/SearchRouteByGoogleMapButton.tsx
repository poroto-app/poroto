import Link from "next/link";
import { generateGoogleMapUrl } from "src/domain/util/googleMap";
import { PlanActionButton } from "src/view/plan/button/PlanActionButton";
import { Plan } from "src/domain/models/Plan";
import { GeoLocation } from "src/domain/models/GeoLocation";

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
    const startLocationOfRoute =
        currentLocation && createdBasedOnCurrentLocation
            ? currentLocation
            : undefined;

    return (
        <Link
            href={generateGoogleMapUrl({
                locations: plan.places.map((place) => place.location),
                startLocation: startLocationOfRoute,
            })}
            target="_blank"
            style={{ width: "100%" }}
        >
            <PlanActionButton
                text="Google Mapで経路を調べる"
                color="#0F88E7"
                imageUrl="/images/google_map_logo.png"
            />
        </Link>
    );
}
