export const PageMetaData = {
    top: {
        title: "komichi",
        description: "暇つぶしプランをあなたの代わりに komichi が作ります",
    },
    place: {
        search: {
            title: "好きな場所からプランを作る | komichi",
            description:
                "お気に入りの場所や観光名所から、思い出に残るプランを作ります",
        },
    },
    plans: {
        interest: {
            title: (fromCurrentLocation: boolean) =>
                `${
                    fromCurrentLocation ? "近場で" : "好きな場所から"
                }プランを作る | komichi`,
            description: "今の気分にあわせて近場で楽しめるプランを作ります",
        },
    },
};
