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
                "https://picsum.photos/300",
                "https://picsum.photos/400",
            ],
            tags: [
                "書店",
                "駅チカ",
            ]
        },
        {
            name: "スターバックス・コーヒー poroto店",
            imageUrls: [
                "https://picsum.photos/300/400",
                "https://picsum.photos/1280/720",
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
        <Box maxWidth="990px" w="100%" px="8px" py="16px" boxSizing="border-box">
            <VStack spacing={8} w="100%">
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