import {
    Accordion,
    Box,
    Button,
    Center,
    HStack,
    Icon,
    Image,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
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
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
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
    titleConfirmUpdate: (props: { selectedPlaceId: string }) => ReactNode;
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
    titleConfirmUpdate,
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
                        title={titleConfirmUpdate({
                            selectedPlaceId: selectedPlaceToUpdate.id,
                        })}
                        image={selectedPlaceToUpdate.images[0]}
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
        <PlaceList
            title={dialogTitle}
            places={places}
            buttonLabelSelectPlace={buttonLabelSelectPlace}
            onClickRelatedPlace={onClickUpdate}
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
    buttonLabelSelectPlace: string;
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
                <VStack flex={1} spacing={0}>
                    <Text
                        fontSize="20px"
                        fontWeight="bold"
                        color="#574836"
                    >
                        {title}
                    </Text>
                    <Text color="#9F8D76" fontWeight="bold">
                        気になった場所をタップ
                    </Text>
                </VStack>
                <Box as="button" onClick={onClose}>
                    <Icon width="24px" height="24px" as={MdClose} />
                </Box>
            </HStack>
            <Accordion w="100%" allowToggle borderColor="transparent" pb="32px">
                <SimpleGrid columns={2} w="100%">
                    {places
                        .filter((p) => p.images.length > 0)
                        .filter((p) => p.categories.length > 0)
                        .map((place, i) => (
                            <PlaceListItem
                                key={i}
                                name={place.name}
                                images={place.images}
                                categories={place.categories}
                                onClick={() => onClickRelatedPlace(place.id)}
                            />
                        ))}
                </SimpleGrid>
            </Accordion>
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
            <Box
                as="button"
                w="120px"
                h="120px"
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
            </Box>
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
    title,
    image,
    buttonLabelUpdatePlace,
    onClickUpdate,
    onCancel,
}: {
    title: ReactNode;
    image: ImageType;
    buttonLabelUpdatePlace: string;
    onClickUpdate: () => void;
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

                    <Text fontSize="18px">{title}</Text>
                </VStack>
            </Center>
            <HStack mt="auto" pb="48px">
                <Button onClick={onCancel} colorScheme="red" variant="outline">
                    キャンセル
                </Button>
                <Button onClick={onClickUpdate} colorScheme="blue">
                    {buttonLabelUpdatePlace}
                </Button>
            </HStack>
        </VStack>
    );
}
