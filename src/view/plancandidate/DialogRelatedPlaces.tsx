import {
    AspectRatio,
    Box,
    Center,
    HStack,
    Icon,
    Image,
    SimpleGrid,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { MdClose } from "react-icons/md";
import {
    getImageSizeOf,
    Image as ImageType,
    ImageSizes,
} from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PlacesWithCategory } from "src/domain/models/PlacesWithCategory";
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
    placesRecommended: Place[] | null;
    placesWithCategories?: PlacesWithCategory[];
    updating: boolean;
    buttonLabelUpdatePlace: string;
    titleSelectScreen: string;
    titleConfirmScreen: string;
    onClose: () => void;
    onClickRelatedPlace: (placeId: string) => void;
};

export function DialogRelatedPlaces({
    visible,
    placesRecommended,
    placesWithCategories,
    updating,
    buttonLabelUpdatePlace,
    titleSelectScreen,
    titleConfirmScreen,
    onClose,
    onClickRelatedPlace,
}: Props) {
    const [selectedPlaceToUpdate, setSelectedPlaceToUpdate] =
        useState<Place | null>();

    const handleOnSelectPlaceToUpdate = (placeId: string) => {
        const places = [
            ...placesRecommended,
            ...(placesWithCategories?.flatMap((pwc) => pwc.places) || []),
        ];
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
        if (placesRecommended === null) setSelectedPlaceToUpdate(null);
    }, [copyObject(placesRecommended)]);

    return (
        <FullscreenDialog
            position="bottom"
            width="800px"
            maxWidth="100%"
            visible={visible}
            onClickOutside={() => {
                if (!updating) onClose();
            }}
        >
            <Center
                backgroundColor="white"
                w="100%"
                h="900px"
                maxH="min(80vh, 800px)"
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
                        dialogTitle={titleSelectScreen}
                        placesRecommended={placesRecommended}
                        placesWithCategories={placesWithCategories}
                        onClickUpdate={handleOnSelectPlaceToUpdate}
                        onClose={onClose}
                    />
                ) : (
                    <ConfirmToUpdateScreen
                        place={selectedPlaceToUpdate}
                        title={titleConfirmScreen}
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
    placesRecommended,
    placesWithCategories,
    onClickUpdate,
    onClose,
}: {
    dialogTitle: string;
    placesRecommended: Place[] | null;
    placesWithCategories?: PlacesWithCategory[];
    onClickUpdate: (placeId: string) => void;
    onClose: () => void;
}) {
    if (placesRecommended == null) return <LoadingScreen />;

    const isPC = !isMobile && !isTablet;

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
            <Tabs
                variant="soft-rounded"
                colorScheme="orange"
                isLazy
                w="100%"
            >
                {placesWithCategories && placesWithCategories.length > 0 && (
                    <TabList
                        w="100%"
                        flexWrap={isPC ? "wrap" : "nowrap"}
                        whiteSpace="nowrap"
                        overflowX="auto"
                    >
                        <Tab>おすすめ</Tab>
                        {placesWithCategories?.map((pwc, i) => (
                            <Tab key={i} display="block">
                                <HStack>
                                    <Icon
                                        as={getPlaceCategoryIcon(pwc.category)}
                                    />
                                    <Text>{pwc.category.displayName}</Text>
                                </HStack>
                            </Tab>
                        ))}
                    </TabList>
                )}
                <TabPanels>
                    <TabPanel>
                        <RecommendPlacesGrid
                            placesRecommended={placesRecommended}
                            onClickUpdate={onClickUpdate}
                        />
                    </TabPanel>
                    {placesWithCategories?.map((pwc, i) => (
                        <TabPanel key={i}>
                            <RecommendPlacesGrid
                                placesRecommended={pwc.places}
                                onClickUpdate={onClickUpdate}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
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
                borderRadius="20px"
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

function RecommendPlacesGrid({
    placesRecommended,
    onClickUpdate,
}: {
    placesRecommended: Place[];
    onClickUpdate: (placeId: string) => void;
}) {
    return (
        <SimpleGrid
            columns={2}
            w="100%"
            spacingY="32px"
            spacingX="16px"
            px="16px"
        >
            {placesRecommended
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
    );
}

export function ConfirmToUpdateScreen({
    place,
    title,
    buttonLabelUpdatePlace,
    onClickUpdate,
    onCancel,
}: {
    place: Place;
    title: string;
    buttonLabelUpdatePlace: string;
    onClickUpdate: () => void;
    onCancel: () => void;
}) {
    return (
        <VStack w="100%" h="100%" spacing="24px" maxW="600px">
            <VStack w="100%" pt="32px" spacing="24px" flex={1}>
                <Text fontSize="20px" fontWeight="bold" color="#222222">
                    {title}
                </Text>
                <VStack
                    alignItems="flex-start"
                    spacing="16px"
                    w="100%"
                    px="16px"
                >
                    <Box
                        w="100%"
                        h="200px"
                        borderRadius="20px"
                        overflow="hidden"
                    >
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
                            placeName={place.name}
                            googlePlaceId={place.googlePlaceId}
                        />
                    </HStack>
                </VStack>
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
