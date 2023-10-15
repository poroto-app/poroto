import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Center,
    HStack,
    Icon,
    Image,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSizes,
} from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceReview } from "src/view/plan/PlaceReview";

type Props = {
    visible: boolean;
    placeNameToBeReplaced: string;
    places: Place[] | null;
    replacing: boolean;
    onClose: () => void;
    onClickRelatedPlace: (placeId: string) => void;
};

export function DialogRelatedPlaces({
    visible,
    placeNameToBeReplaced,
    places,
    replacing,
    onClose,
    onClickRelatedPlace,
}: Props) {
    const [selectedPlaceToReplace, setSelectedPlaceToReplace] =
        useState<Place | null>();

    const handleOnSelectPlaceToReplace = (placeId: string) => {
        setSelectedPlaceToReplace(places.find((p) => p.id === placeId) || null);
    };

    const handleOnReplacePlace = () => {
        onClickRelatedPlace(selectedPlaceToReplace.id);
        setSelectedPlaceToReplace(null);
    };

    const handleOnCancelReplacePlace = () => {
        setSelectedPlaceToReplace(null);
    };

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
                h="900px"
                maxH="80vh"
                borderTopRadius="20px"
                overflowY="scroll"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {replacing ? (
                    <LoadingScreen />
                ) : selectedPlaceToReplace == null ? (
                    <SelectPlaceToReplaceScreen
                        name={placeNameToBeReplaced}
                        places={places}
                        onClickReplace={handleOnSelectPlaceToReplace}
                        onClose={onClose}
                    />
                ) : (
                    <ConfirmReplaceScreen
                        placeNameToBeReplaced={placeNameToBeReplaced}
                        placeNameToReplace={selectedPlaceToReplace.name}
                        image={selectedPlaceToReplace.images[0]}
                        onClickReplace={handleOnReplacePlace}
                        onCancel={handleOnCancelReplacePlace}
                    />
                )}
            </Center>
        </FullscreenDialog>
    );
}

function LoadingScreen() {
    return (
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#84A6FF"
            size="xl"
        />
    );
}

function SelectPlaceToReplaceScreen({
    name,
    places,
    onClickReplace,
    onClose,
}: {
    name: string;
    places: Place[] | null;
    onClickReplace: (placeId: string) => void;
    onClose: () => void;
}) {
    if (places == null) return <LoadingScreen />;

    return (
        <PlaceList
            title={`「${name}」に関連する場所`}
            places={places}
            onClickRelatedPlace={onClickReplace}
            onClose={onClose}
        />
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
            <Accordion w="100%" allowToggle borderColor="transparent" pb="32px">
                <VStack w="100%">
                    {places
                        .filter((p) => p.images.length > 0)
                        .filter((p) => p.categories.length > 0)
                        .map((place, i) => (
                            <PlaceListItem
                                key={i}
                                name={place.name}
                                images={place.images}
                                categories={place.categories}
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
    categories,
    images,
    reviews,
    onClickReplacePlace,
}: {
    name: string;
    categories: PlaceCategory[];
    images: ImageType[];
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
                    <Image
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        src={
                            images.length > 0 &&
                            getImageSizeOf(ImageSizes.Small, images[0])
                        }
                    />
                </Box>
                <VStack alignItems="flex-start" flex={1}>
                    <HStack>
                        <Icon
                            w="24px"
                            h="24px"
                            as={getPlaceCategoryIcon(
                                categories.length > 0 ? categories[0] : null
                            )}
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

export function ConfirmReplaceScreen({
    placeNameToBeReplaced,
    placeNameToReplace,
    image,
    onClickReplace,
    onCancel,
}: {
    placeNameToBeReplaced: string;
    placeNameToReplace: string;
    image: ImageType;
    onClickReplace: () => void;
    onCancel: () => void;
}) {
    return (
        <VStack w="100%" h="100%" px="16px" py="16px">
            <Center flex={1} w="100%">
                <VStack spacing="16px">
                    <Box
                        w="200px"
                        h="200px"
                        borderRadius="20px"
                        overflow="hidden"
                    >
                        <Image
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            src={getImageSizeOf(ImageSizes.Small, image)}
                        />
                    </Box>

                    <Text fontSize="18px">
                        「<b>{placeNameToBeReplaced}</b>」 を 「
                        <b>{placeNameToReplace}</b>」 と入れ替えますか？
                    </Text>
                </VStack>
            </Center>
            <HStack mt="auto" pb="48px">
                <Button onClick={onCancel} colorScheme="red" variant="outline">
                    キャンセル
                </Button>
                <Button onClick={onClickReplace} colorScheme="blue">
                    入れ替える
                </Button>
            </HStack>
        </VStack>
    );
}
