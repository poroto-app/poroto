import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import {
    reduxPlanSelector,
    setPlaceIdToCreatePlan,
    setPlansByUser,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { LikePlacesList } from "src/view/account/LikePlacesList";
import { NotLoggedIn } from "src/view/account/NotLoggedIn";
import { UsersPlan } from "src/view/account/UsersPlan";
import { Layout } from "src/view/common/Layout";
import { Padding } from "src/view/constants/padding";
import { useAuth } from "src/view/hooks/useAuth";
import { useLikePlaces } from "src/view/hooks/useLikePlaces";
import {
    BottomNavigation,
    BottomNavigationPages,
} from "src/view/navigation/BottomNavigation";
import { NavBar } from "src/view/navigation/NavBar";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";

export default function AccountPage() {
    const dispatch = useAppDispatch();
    const { user, isLoggedInUser, signInWithGoogle } = useAuth();

    useEffect(() => {
        if (!user) {
            dispatch(setPlansByUser({ plans: null }));
            return;
        }
    }, [user]);

    return (
        <Layout
            navBar={<NavBar />}
            bottomNavigation={
                <BottomNavigation page={BottomNavigationPages.Account} />
            }
        >
            {isLoggedInUser ? (
                <Account />
            ) : (
                <NotLoggedIn onLogin={signInWithGoogle} />
            )}
        </Layout>
    );
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
            <VStack w="100%" spacing="32px" pb={Padding.p64}>
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
