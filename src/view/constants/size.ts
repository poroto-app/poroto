import { Padding } from "src/view/constants/padding";
import { isPC } from "src/view/constants/userAgent";

export const Size = {
    mainContentWidth: "var(--size-main-content-width)",
    top: {
        px: Padding.p16,
        SectionTitle: {
            px: Padding.p24,
        },
    },
    PlaceCardPaddingH: Padding.p16,
    NavBar: {
        height: "50px",
    },
    BottomNavigation: {
        height: 50,
    },
    PlanDetailHeader: {
        maxH: "900px",
        maxW: "500px",
        px: Padding.p16,
        imageH: 300,
        PlaceList: {
            height: 160,
            scrollBarHeight: isPC ? 8 : 0,
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
    PlanCandidate: {
        Footer: {
            h: "80px",
        },
    },
};
