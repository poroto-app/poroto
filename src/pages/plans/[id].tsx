import { Box } from "@chakra-ui/react"
import { NavBar } from "src/view/common/NavBar"

// TODO: Delete
const plan = {
    id: "cafe",
    title: "カフェでほっと一息",
    places: [
        {
            name: "poroto書店",
            imageUrls: [
                "https://picsum.photos/200",
                "https://picsum.photos/200",
                "https://picsum.photos/200",
            ],
            tags: [
                "書店",
                "駅チカ",
            ]
        },
        {
            name: "スターバックス・コーヒー poroto店",
            imageUrls: [
                "https://picsum.photos/200/800",
                "https://picsum.photos/200/500",
                "https://picsum.photos/400/600",
            ],
            tags: [
                "スタバ",
                "季節限定",
                "もも",
            ]
        },
    ],
}

const PlanDetail = () => {
    return <Box>
        <NavBar title={plan.title} />
    </Box>
}

export default PlanDetail