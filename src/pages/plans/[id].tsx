import { Box, Center, Container, VStack } from "@chakra-ui/react"
import { NavBar } from "src/view/common/NavBar"
import { PlacePreview } from "src/view/plan/PlacePreview"

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
    return <Center flexDirection="column">
        <NavBar title={plan.title} />
        <Box maxWidth="990px" w="100%" py="16px" px="8px">
            <VStack>
                {
                    plan.places.map((place, i) => <PlacePreview
                        key={i}
                        name={place.name}
                        imageUrls={place.imageUrls}
                        tags={place.tags}
                    />)
                }
            </VStack>
        </Box>
    </Center>
}

export default PlanDetail