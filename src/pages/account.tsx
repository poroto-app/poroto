import { Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Padding } from "src/constant/padding";
import { User } from "src/domain/models/User";
import { hasValue } from "src/domain/util/null";
import { useAuth } from "src/hooks/useAuth";
import { useEditProfile } from "src/hooks/useEditProfile";
import { useLikePlaces } from "src/hooks/useLikePlaces";
import {
    reduxPlanSelector,
    setPlaceIdToCreatePlan,
    setPlansByUser,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { EditUserProfileDialog } from "src/view/account/EditUserProfileDialog";
import { LikePlacesList } from "src/view/account/LikePlacesList";
import { NotLoggedIn } from "src/view/account/NotLoggedIn";
import { UserCard } from "src/view/account/UserCard";
import { UsersPlan } from "src/view/account/UsersPlan";
import { Layout } from "src/view/common/Layout";
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
            height={hasValue(user) ? "auto" : "100%"}
            navBar={<NavBar />}
            bottomNavigation={
                <BottomNavigation page={BottomNavigationPages.Account} />
            }
        >
            {isLoggedInUser ? (
                <Account user={user} />
            ) : (
                <NotLoggedIn onLogin={signInWithGoogle} />
            )}
        </Layout>
    );
}

function Account({ user }: { user: User | null }) {
    const dispatch = useAppDispatch();
    const { plansByUser } = reduxPlanSelector();
    const {
        likePlaces,
        likePlaceToCreatePlan,
        onSelectLikePlace,
        onCreatePlanFromLikePlace,
    } = useLikePlaces();
    const {
        isEditUserProfileDialogVisible,
        openEditUserProfileDialog,
        closeEditUserProfileDialog,
        updateProfile,
    } = useEditProfile();

    return (
        <>
            <VStack
                w="100%"
                spacing="32px"
                pt={Padding.p32 + "px"}
                pb={Padding.p64 + "px"}
            >
                <Box px={Padding.p16 + "px"} w="100%">
                    <UserCard
                        user={user}
                        isEditable={true}
                        onEdit={openEditUserProfileDialog}
                        onClickAvatarIcon={openEditUserProfileDialog}
                    />
                </Box>
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
                <EditUserProfileDialog
                    user={user}
                    isVisible={isEditUserProfileDialogVisible}
                    onClose={closeEditUserProfileDialog}
                    onSaveProfile={({ name, profileImageBlob }) =>
                        updateProfile({ name, profileImageBlob })
                    }
                />
            </>
        </>
    );
}
