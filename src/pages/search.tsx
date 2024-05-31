import { GetStaticProps } from "next";
import { Layout } from "src/view/common/Layout";
import { Size } from "src/view/constants/size";
import { useNearbyPlans } from "src/view/hooks/useNearbyPlans";
import { NavBar } from "src/view/navigation/NavBar";
import { NearbyPlanList } from "src/view/plan/NearbyPlanList";

export default function SearchPage() {
    const {
        plansNearby,
        locationPermission,
        isFetchingCurrentLocation,
        isFetchingNearbyPlans,
        fetchNearbyPlans,
    } = useNearbyPlans();

    return (
        <Layout navBar={<NavBar />}>
            {/* TODO: 拒否設定されている場合の対処をする */}
            <NearbyPlanList
                plans={plansNearby}
                locationPermission={locationPermission}
                px={Size.top.px}
                isFetchingCurrentLocation={isFetchingCurrentLocation}
                isFetchingNearbyPlans={isFetchingNearbyPlans}
                onRequestFetchNearByPlans={fetchNearbyPlans}
            />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};
