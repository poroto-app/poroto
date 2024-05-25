import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import {
    reduxPlanSelector,
    setPlaceIdToCreatePlan,
    setPlansByUser,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { Layout } from "src/view/common/Layout";
import { useAuth } from "src/view/hooks/useAuth";
import { useLikePlaces } from "src/view/hooks/useLikePlaces";
import { NavBar } from "src/view/navigation/NavBar";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";
import { LikePlacesList } from "src/view/top/LikePlacesList";
import { UsersPlan } from "src/view/top/UsersPlan";

export default function AccountPage() {
    const dispatch = useAppDispatch();
    const { user, isLoggedInUser } = useAuth();

    useEffect(() => {
        if (!user) {
            dispatch(setPlansByUser({ plans: null }));
            return;
        }
    }, [user]);

    return (
        <Layout navBar={<NavBar />}>
            {isLoggedInUser ? <Account /> : <NotLoggedIn />}
        </Layout>
    );
}

function NotLoggedIn() {
    return <VStack></VStack>;
}

function Account() {
    const dispatch = useAppDispatch();
    const { plansByUser } = reduxPlanSelector();
    const {
        likePlaces,
        likePlaceToCreatePlan,
        onSelectLikePlace,
        onCreatePlanFromLikePlace,
    } = useLikePlaces();

    return (
        <>
            <VStack w="100%" spacing="24px">
                <LikePlacesList
                    places={likePlaces}
                    onSelectLikePlace={onSelectLikePlace}
                />
                <UsersPlan plans={plansByUser} isLoading={!plansByUser} />
            </VStack>
            <>
                <CreatePlanDialog
                    place={likePlaceToCreatePlan}
                    onClickClose={() => dispatch(setPlaceIdToCreatePlan(null))}
                    onClickCreatePlan={(place) =>
                        onCreatePlanFromLikePlace(place)
                    }
                />
            </>
        </>
    );
}
