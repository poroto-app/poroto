import {NavBar} from "src/view/common/NavBar";
import {PlanEntry, PlanTag} from "src/domain/plan/Plan";
import {Grid, GridItem, HStack, Text, VStack} from "@chakra-ui/react";
import styled from "styled-components";

// TODO: Delete
const plans: PlanEntry[] = [
    {
        id: "cate",
        title: "カフェでほっと一息",
        imageUrls: ["https://picsum.photos/200"],
        tags: [
            {content: "カフェ"}
        ]
    },
    {
        id: "cafe&book",
        title: "ゆっくり読書時間",
        imageUrls: [
            "https://picsum.photos/600/500",
            "https://picsum.photos/800/500",
            "https://picsum.photos/600/300"
        ],
        tags: [
            {content: "カフェ"},
            {content: "書店"}
        ]
    }
]

const SelectPlanPage = () => {
    return <div>
        <NavBar title="プランを選ぶ"/>
        <VStack w="100%" px="16px" spacing={16} py="16px">
            {
                plans.map((plan) => <VStack key={plan.id} w="100%" maxW="300px">
                    <PlanThumbnail imageUrls={plan.imageUrls}/>
                    <HStack w="100%" justifyContent="flex-start">
                        {plan.tags.map((tag) => <Tag tag={tag}/>)}
                    </HStack>
                </VStack>)
            }
        </VStack>
    </div>
}


const PlanThumbnail = ({imageUrls}: { imageUrls: string[] }) => {

    return <Grid
        width="300px" height="300px"
        templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)"
        borderRadius="10px" overflow="hidden"
    >
        {
            imageUrls.map((url) => <GridItem>
                <Thumbnail src={url}/>
            </GridItem>)
        }
    </Grid>
}

const Thumbnail = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Tag = ({tag}: { tag: PlanTag }) => {
    return <Text>{tag.content}</Text>
}

export default SelectPlanPage;