import {
    Avatar,
    Box,
    Button,
    Center,
    Circle,
    Flex,
    HStack,
    Icon,
    Text,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import * as process from "process";
import { useRef, useState } from "react";
import {
    MdArrowRight,
    MdLink,
    MdOutlineCameraAlt,
    MdOutlineInfo,
} from "react-icons/md";
import { ImageSize } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { CollageContainer } from "src/view/plandetail/CollageContainer";
import { CollageTemplate } from "src/view/plandetail/CollageTemplate";
import { PlaceImageGallery } from "src/view/plandetail/header/PlaceImageGallery";

type Props = {
    plan: Plan;
    imageSizeOfPlacePhoto?: ImageSize;
    likedPlaceIds: string[];
    onUpdateLikePlace: (placeId: string, isLiked: boolean) => void;
    onCopyPlanUrl?: () => void;
};

export const PlanHeaderTabs = {
    Info: "Info",
    Collage: "Collage",
};
export type PlanHeaderTab =
    (typeof PlanHeaderTabs)[keyof typeof PlanHeaderTabs];

export function PlanDetailPageHeader({
    plan,
    likedPlaceIds,
    onUpdateLikePlace,
    onCopyPlanUrl,
}: Props) {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(0);
    const placesWithImages = plan.places.filter(
        (place) => place.images.length > 0
    );
    const [activeTab, setActiveTab] = useState(PlanHeaderTabs.Info);

    const mockPlaces = plan.places.map((place, index) => ({
        name: place.name,
        duration: index * 30 + 30,
        imageUrl: "https://via.placeholder.com/400",
    }));

    const mockIntroduction = "これは紹介文のモックです。";
    const infoRef = useRef<HTMLDivElement>(null);

    return (
        <VStack
            flex={1}
            w="100%"
            h="100%"
            maxH="700px"
            py="32px"
            backgroundColor="#6F5231"
            spacing="16px"
            overflow="hidden"
        >
            <HStack
                w="100%"
                spacing="16px"
                justifyContent="flex-end"
                zIndex={1}
                px={Size.PlanDetailHeader.px}
                maxW={Size.PlanDetailHeader.maxW}
            >
                <VStack
                    alignSelf="center"
                    w="100%"
                    mb="16px"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Text color="white" fontWeight="bold" fontSize="20px">
                        {plan.title}
                    </Text>
                    {plan.author && (
                        <HStack>
                            <Avatar
                                name={plan.author.name}
                                src={plan.author.avatarImage}
                                size="sm"
                            />
                            <Text color="white">{plan.author.name}</Text>
                        </HStack>
                    )}
                </VStack>
                <HStack alignSelf="center">
                    {onCopyPlanUrl && (
                        <Circle
                            as="button"
                            px="8px"
                            py="8px"
                            backgroundColor="rgba(255, 255, 255, .8)"
                            onClick={onCopyPlanUrl}
                        >
                            <Icon
                                w="24px"
                                h="24px"
                                color="#875643"
                                as={MdLink}
                                transform="rotate(-45deg)"
                            />
                        </Circle>
                    )}
                </HStack>
            </HStack>
            {activeTab === PlanHeaderTabs.Info ? (
                <VStack
                    w="100%"
                    maxW={Size.PlanDetailHeader.maxW}
                    flex={1}
                    ref={infoRef}
                    spacing={Size.PlanDetailHeader.Info.spacingY + "px"}
                >
                    <Center
                        px={Size.PlanDetailHeader.px}
                        w="100%"
                        maxW={Size.PlanDetailHeader.maxW}
                        flex={1}
                        zIndex={0}
                    >
                        <PlaceImageGallery
                            places={placesWithImages}
                            currentPage={currentPage}
                            likedPlaceIds={likedPlaceIds}
                            onUpdateLikePlace={onUpdateLikePlace}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </Center>
                    <Schedule
                        places={plan.places}
                        activeIndex={currentPage}
                        onClickPlace={({ index }) => setCurrentPage(index)}
                    />
                </VStack>
            ) : (
                <Flex
                    flex={!isPC && 1}
                    w="100%"
                    h={
                        isPC &&
                        Size.PlanDetailHeader.imageH +
                            Size.PlanDetailHeader.Info.spacingY +
                            Size.PlanDetailHeader.PlaceList.height +
                            Size.PlanDetailHeader.PlaceList.scrollBarHeight +
                            "px"
                    }
                >
                    <CollageContainer>
                        <CollageTemplate
                            title={plan.title}
                            places={mockPlaces}
                            introduction={mockIntroduction}
                        />
                    </CollageContainer>
                </Flex>
            )}
            {process.env.APP_ENV === "development" && (
                <HStack>
                    <Button
                        onClick={() => setActiveTab(PlanHeaderTabs.Info)}
                        color="white"
                        background="#AC8E6C"
                        _hover={{ background: "#b8a998" }}
                        opacity={activeTab === PlanHeaderTabs.Info ? 1 : 0.3}
                        leftIcon={<Icon as={MdOutlineInfo} />}
                    >
                        {t("common:info")}
                    </Button>
                    <Button
                        onClick={() => setActiveTab(PlanHeaderTabs.Collage)}
                        color="white"
                        backgroundSize="200% auto"
                        opacity={activeTab === PlanHeaderTabs.Collage ? 1 : 0.3}
                        leftIcon={<Icon as={MdOutlineCameraAlt} />}
                    >
                        {t("plan:album")}
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}

function Schedule({
    places,
    activeIndex = 0,
    onClickPlace,
}: {
    places: Place[];
    activeIndex?: number;
    onClickPlace?: (props: { place: Place; index: number }) => void;
}) {
    return (
        <VStack w="100%" alignItems="flex-start" spacing={Padding.p16}>
            <HStack w="100%" px={Size.PlanDetailHeader.px}>
                <Box backgroundColor="white" px={Padding.p4}>
                    <Text color="#704E26" fontWeight="bold" fontSize="20px">
                        Schedule
                    </Text>
                </Box>
                <Box
                    flex={1}
                    h="3px"
                    backgroundImage="radial-gradient(circle, white 0, white 5px, transparent 5px)"
                    backgroundSize="20px 2px"
                    backgroundRepeat="repeat-x"
                    backgroundPosition="left center"
                />
            </HStack>
            <HorizontalScrollableList
                alignItems="center"
                edgeCornerRadius={10}
                pageButtonOpacity={0.6}
                px={Size.PlanDetailHeader.px}
            >
                {places.map((place, i) => (
                    <HStack key={i}>
                        {i > 0 && (
                            <Icon
                                color="white"
                                h="32px"
                                w="32px"
                                as={MdArrowRight}
                            />
                        )}
                        <Box
                            as="button"
                            w="100px"
                            h="80px"
                            overflow="hidden"
                            borderRadius="10px"
                            position="relative"
                            border={i === activeIndex && "3px solid #84A6FF"}
                            onClick={() => onClickPlace?.({ place, index: i })}
                        >
                            {place.images.length > 0 && (
                                <Image
                                    src={place.images[0].small}
                                    alt={place.name}
                                    width={100}
                                    height={80}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        userSelect: "none",
                                    }}
                                />
                            )}
                            <Box
                                backgroundColor="#373737"
                                color="white"
                                borderRadius="10px"
                                position="absolute"
                                left={Padding.p4}
                                bottom={Padding.p4}
                                px={Padding.p4}
                            >
                                <Text fontSize="0.75rem" fontWeight="bold">
                                    Spot {i + 1}
                                </Text>
                            </Box>
                        </Box>
                    </HStack>
                ))}
            </HorizontalScrollableList>
        </VStack>
    );
}
