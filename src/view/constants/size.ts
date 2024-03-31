// TODO: この定数を用いて統一する
const Padding = {
    p8: "8px",
    p16: "16px",
}

export const Size = {
    mainContentWidth: "var(--size-main-content-width)",
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
