import {Padding} from "src/view/constants/padding";

export const Size = {
    mainContentWidth: "var(--size-main-content-width)",
    top: {
        px: Padding.p16,
        SectionTitle: {
            px: Padding.p24,
        }
    },
    PlaceCardPaddingH: Padding.p16,
    NavBar: {
        height: "50px",
    },
    PlanDetailHeader: {
        maxH: "900px",
        maxW: "500px",
        px: Padding.p16,
        imageH: "300px",
    },
    PlanList: {
        SavedPlan: {
            ThumbnailHeight: "250px",
        },
        LikePlace: {
            w: "200px",
            h: "250px",
        },
    },
    PlaceCard: {
        w: "200px",
        h: "200px",
        borderRadius: "20px",
    },
};
