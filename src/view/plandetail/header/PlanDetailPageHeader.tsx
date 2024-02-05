import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ImageSize } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { Size } from "src/view/constants/size";
import { PlaceImageGallery } from "src/view/plandetail/header/PlaceImageGallery";
import { PlaceList } from "src/view/plandetail/header/PlaceList";
import styled from "styled-components";

type Props = {
    plan: Plan;
    imageSizeOfPlacePhoto?: ImageSize;
};

export function PlanDetailPageHeader({ plan }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const placesWithImages = plan.places.filter(
        (place) => place.images.length > 0
    );
    return (
        <HeaderContainer>
            <VStack w="100%" h="100%" spacing="16px">
                <Box px={Size.PlanDetailHeader.px}>
                    <PlaceImageGallery
                        places={placesWithImages}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </Box>
                <PlaceList
                    places={plan.places}
                    onClickPlace={({ index }) => setCurrentPage(index)}
                />
                <VStack
                    w="100%"
                    px={Size.PlanDetailHeader.px}
                    maxW={Size.PlanDetailHeader.maxW}
                    alignItems="flex-start"
                    justifyContent="center"
                    flex={1}
                >
                    <Text color="white" fontWeight="bold" fontSize="20px">
                        {plan.title}
                    </Text>
                    {plan.author && (
                        <HStack>
                            <Avatar
                                name={plan.author.name}
                                src={plan.author.avatarImage}
                            />
                            <Text color="white">{plan.author.name}</Text>
                        </HStack>
                    )}
                </VStack>
            </VStack>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    background-color: #483216;
    padding: 32px 0;
    height: 100vh;
    max-height: 1000px;
`;
