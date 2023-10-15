import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Center,
    HStack,
    Icon,
    Image,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceReview } from "src/view/plan/PlaceReview";

type Props = {
    visible: boolean;
    title: string;
    places: Place[] | null;
    onClose: () => void;
    onClickRelatedPlace: (placeId: string) => void;
};

export function DialogRelatedPlaces({
    visible,
    title,
    places,
    onClose,
    onClickRelatedPlace,
}: Props) {
    return (
        <FullscreenDialog
            position="bottom"
            width="100%"
            visible={visible}
            onClickOutside={onClose}
        >
            <Center
                backgroundColor="white"
                w="100%"
                h="600px"
                maxH="100%"
                borderTopRadius="20px"
            >
                {places == null ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#84A6FF"
                        size="xl"
                    />
                ) : (
                    <PlaceList
                        title={title}
                        places={places}
                        onClickRelatedPlace={(placeId) =>
                            onClickRelatedPlace(placeId)
                        }
                        onClose={onClose}
                    />
                )}
            </Center>
        </FullscreenDialog>
    );
}

function PlaceList({
    title,
    places,
    onClickRelatedPlace,
    onClose,
}: {
    title: string;
    places: Place[];
    onClickRelatedPlace: (placeId: string) => void;
    onClose: () => void;
}) {
    return (
        <VStack
            w="100%"
            h="100%"
            py="32px"
            px="16px"
            maxW="500px"
            overflowY="scroll"
            sx={{
                "::-webkit-scrollbar": {
                    display: "none",
                },
            }}
            spacing="16px"
        >
            <HStack w="100%">
                <Text
                    flex={1}
                    fontSize="20px"
                    fontWeight="bold"
                    color="#222222"
                >
                    {title}
                </Text>
                <Box as="button" onClick={onClose}>
                    <Icon width="24px" height="24px" as={MdClose} />
                </Box>
            </HStack>
            <Accordion w="100%" allowToggle borderColor="transparent">
                <VStack w="100%">
                    {/*TODO: 画像がない場合の対応*/}
                    {places.map((place, i) => (
                        <PlaceListItem
                            key={i}
                            name={place.name}
                            image={
                                place.images &&
                                getImageSizeOf(
                                    ImageSizes.Small,
                                    place.images[0]
                                )
                            }
                            category={
                                place.categories.length > 0
                                    ? place.categories[0]
                                    : null
                            }
                            reviews={place.googlePlaceReviews}
                            onClickReplacePlace={() =>
                                onClickRelatedPlace(place.id)
                            }
                        />
                    ))}
                </VStack>
            </Accordion>
        </VStack>
    );
}

export function PlaceListItem({
    name,
    category,
    image,
    reviews,
    onClickReplacePlace,
}: {
    name: string;
    category: PlaceCategory | null;
    image: string;
    reviews: GooglePlaceReview[] | null;
    onClickReplacePlace: () => void;
}) {
    return (
        <AccordionItem
            w="100%"
            backgroundColor="#F3F6FE"
            borderRadius="5px"
            borderColor="transparent"
        >
            <HStack w="100%">
                <Box w="80px" h="80px" overflow="hidden" borderRadius="5px">
                    <Image w="100%" h="100%" objectFit="cover" src={image} />
                </Box>
                <VStack alignItems="flex-start" flex={1}>
                    <HStack>
                        <Icon
                            w="24px"
                            h="24px"
                            as={getPlaceCategoryIcon(category)}
                        />
                        <Text>{name}</Text>
                    </HStack>
                    <Box
                        color="#4A66B5"
                        fontWeight="bold"
                        as="button"
                        onClick={onClickReplacePlace}
                    >
                        この場所と入れ替える
                    </Box>
                </VStack>
                {reviews && reviews.length > 0 && (
                    <AccordionButton px="8px" w="auto">
                        <AccordionIcon />
                    </AccordionButton>
                )}
            </HStack>
            <AccordionPanel>
                <VStack w="100%">
                    {reviews &&
                        reviews.map((review, i) => (
                            <PlaceReview
                                key={i}
                                authorName={review.authorName}
                                authorUrl={review.authorUrl}
                                text={review.text}
                            />
                        ))}
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
}
