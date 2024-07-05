import { Padding } from "src/view/constants/padding";

export const Size = {
    mainContentWidth: "var(--size-main-content-width)",
    top: {
        px: Padding.p16,
        SectionTitle: {
            px: Padding.p24,
        },
    },
    CreatePlanCategory: {
        CategoryImage: {
            width: 300,
            height: 200,
        },
    },
    PlaceCardPaddingH: Padding.p16,
    NavBar: {
        height: "50px",
        avatar: {
            width: 33,
            height: 33,
        },
    },
    BottomNavigation: {
        height: 50,
    },
    PlanDetailHeader: {
        maxH: "900px",
        maxW: "500px",
        px: Padding.p16,
        image: {
            h: 350,
            maxW: 300,
        },
        Schedule: {
            Title: {
                height: 30,
            },
            Place: {
                width: 120,
                height: 80,
            },
        },
        Info: {
            spacingY: 16,
        },
    },
    PlanDetail: {
        px: Padding.p16,
    },
    PlanList: {
        SavedPlan: {
            ThumbnailHeight: "250px",
        },
        LikePlace: {
            w: 200,
            h: 250,
        },
    },
    PlaceCard: {
        w: "200px",
        h: "200px",
        borderRadius: "20px",
    },
    PlanFooter: {
        h: 80,
    },
};
