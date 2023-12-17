import {
    AspectRatio,
    Box,
    Center,
    HStack,
    Icon,
    Image,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSizes,
} from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { copyObject } from "src/domain/util/object";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { ImageSliderPreview } from "src/view/common/ImageSliderPreview";
import { RoundedButton } from "src/view/common/RoundedButton";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import {
    PlaceChipActionGoogleMaps,
    PlaceChipActionInstagram,
} from "src/view/plandetail/PlaceChipContextAction";
import { PlaceInfoTab } from "src/view/plandetail/PlaceInfoTab";
import { OnClickHandler } from "src/view/types/handler";

type Props = {
    visible: boolean;
    dialogTitle: string;
    places: Place[] | null;
    updating: boolean;
    buttonLabelUpdatePlace: string;
    buttonLabelSelectPlace: string;
    onClose: () => void;
    onClickRelatedPlace: (placeId: string) => void;
};

export function DialogRelatedPlaces({
    visible,
    dialogTitle,
    places,
    updating,
    buttonLabelUpdatePlace,
    buttonLabelSelectPlace,
    onClose,
    onClickRelatedPlace,
}: Props) {
    const [selectedPlaceToUpdate, setSelectedPlaceToUpdate] =
        useState<Place | null>();

    const handleOnSelectPlaceToUpdate = (placeId: string) => {
        setSelectedPlaceToUpdate(places.find((p) => p.id === placeId) || null);
    };

    const handleOnUpdatePlace = () => {
        onClickRelatedPlace(selectedPlaceToUpdate.id);
        setSelectedPlaceToUpdate(null);
    };

    const handleOnCancelUpdate = () => {
        setSelectedPlaceToUpdate(null);
    };

    useEffect(() => {
        if (places === null) setSelectedPlaceToUpdate(null);
    }, [copyObject(places)]);

    return (
        <FullscreenDialog
            position="bottom"
            width="100%"
            visible={visible}
            onClickOutside={() => {
                if (!updating) onClose();
            }}
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
                {updating ? (
                    <LoadingScreen />
                ) : selectedPlaceToUpdate == null ? (
                    <SelectPlaceToUpdateScreen
                        dialogTitle={dialogTitle}
                        places={places}
                        buttonLabelSelectPlace={buttonLabelSelectPlace}
                        onClickUpdate={handleOnSelectPlaceToUpdate}
                        onClose={onClose}
                    />
                ) : (
                    <ConfirmToUpdateScreen
                        place={selectedPlaceToUpdate}
                        buttonLabelUpdatePlace={buttonLabelUpdatePlace}
                        onClickUpdate={handleOnUpdatePlace}
                        onCancel={handleOnCancelUpdate}
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

function SelectPlaceToUpdateScreen({
    dialogTitle,
    places,
    buttonLabelSelectPlace,
    onClickUpdate,
    onClose,
}: {
    dialogTitle: string;
    places: Place[] | null;
    buttonLabelSelectPlace: string;
    onClickUpdate: (placeId: string) => void;
    onClose: () => void;
}) {
    if (places == null) return <LoadingScreen />;

    return (
        <VStack
            w="100%"
            h="100%"
            py="32px"
            px="16px"
            maxW="500px"
            spacing="32px"
            overflowY="auto"
        >
            <HStack w="100%">
                <VStack flex={1} spacing={0}>
                    <Text fontSize="20px" fontWeight="bold" color="#574836">
                        {dialogTitle}
                    </Text>
                    <Text color="#9F8D76" fontWeight="bold">
                        気になった場所をタップ
                    </Text>
                </VStack>
                <Box as="button" onClick={onClose}>
                    <Icon width="24px" height="24px" as={MdClose} />
                </Box>
            </HStack>
            <SimpleGrid
                columns={2}
                w="100%"
                spacingY="32px"
                spacingX="16px"
                px="16px"
            >
                {places
                    .filter((p) => p.images.length > 0)
                    .filter((p) => p.categories.length > 0)
                    .map((place, i) => (
                        <PlaceListItem
                            key={i}
                            name={place.name}
                            images={place.images}
                            categories={place.categories}
                            onClick={() => onClickUpdate(place.id)}
                        />
                    ))}
            </SimpleGrid>
        </VStack>
    );
}

export function PlaceListItem({
    name,
    categories,
    images,
    onClick,
}: {
    name: string;
    categories: PlaceCategory[];
    images: ImageType[];
    onClick: OnClickHandler;
}) {
    return (
        <VStack spacing="16px">
            <AspectRatio
                as="button"
                w="100%"
                maxW="180px"
                ratio={1}
                borderRadius="100%"
                overflow="hidden"
                onClick={onClick}
            >
                <Image
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={
                        images.length > 0 &&
                        getImageSizeOf(ImageSizes.Small, images[0])
                    }
                />
            </AspectRatio>
            <HStack spacing="4px" alignItems="flex-start" onClick={onClick}>
                <Icon
                    w="24px"
                    h="24px"
                    color="#946A35"
                    as={getPlaceCategoryIcon(
                        categories.length > 0 ? categories[0] : null
                    )}
                />
                <Text fontWeight="bold" color="#574836">
                    {name}
                </Text>
            </HStack>
        </VStack>
    );
}

export function ConfirmToUpdateScreen({
    place,
    buttonLabelUpdatePlace,
    onClickUpdate,
    onCancel,
}: {
    place: Place;
    buttonLabelUpdatePlace: string;
    onClickUpdate: () => void;
    onCancel: () => void;
}) {
    return (
        <VStack w="100%" h="100%" py="16px" spacing="24px" maxW="600px">
            <VStack alignItems="flex-start" spacing="16px" w="100%" px="16px">
                <Box w="100%" h="200px" borderRadius="20px" overflow="hidden">
                    {place.images.length > 0 && (
                        <ImageSliderPreview
                            images={place.images}
                            borderRadius={20}
                        />
                    )}
                </Box>
                <Text fontSize="18px" fontWeight="bold" px="4px">
                    {place.name}
                </Text>
            </VStack>
            <VStack w="100%">
                <PlaceInfoTab
                    tabHSpaacing="20px"
                    priceRange={place.priceRange}
                    categories={place.categories}
                    googlePlaceReviews={place.googlePlaceReviews}
                    estimatedStayDuration={place.estimatedStayDuration}
                />
                <HStack w="100%" px="20px" alignItems="flex-stat">
                    <PlaceChipActionInstagram placeName={place.name} />
                    <PlaceChipActionGoogleMaps
                        googlePlaceId={place.googlePlaceId}
                    />
                </HStack>
            </VStack>
            <HStack w="100%" pb="48px" px="20px">
                <RoundedButton w="100%" outlined onClick={onCancel}>
                    キャンセル
                </RoundedButton>
                <RoundedButton w="100%" onClick={onClickUpdate}>
                    {buttonLabelUpdatePlace}
                </RoundedButton>
            </HStack>
        </VStack>
    );
}
