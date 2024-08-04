import { Padding } from "src/constant/padding";

export const Size = {
    mainContentWidth: 990,
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
        height: 50,
        avatar: {
            width: 33,
            height: 33,
        },
    },
    BottomNavigation: {
        height: 50,
    },
    PlanDetailHeader: {
        maxH: 900,
        maxW: 500,
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
            ThumbnailHeight: 250,
        },
        LikePlace: {
            w: 200,
            h: 250,
        },
    },
    PlaceCard: {
        w: 200,
        h: 200,
        borderRadius: 20,
    },
    PlanCandidatesGallery: {
        Card: {
            borderRadius: 20,
            w: 300,
            h: {
                active: 500,
                inactive: 450,
            },
        },
    },
    PlanFooter: {
        h: 80,
    },
} as const;
