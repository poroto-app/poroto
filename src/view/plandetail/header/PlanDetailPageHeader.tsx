import {
    Avatar,
    Box,
    Button,
    Center,
    HStack,
    Icon,
    Text,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdLink, MdOutlineInfo, MdOutlineCameraAlt  } from "react-icons/md";
import { ImageSize } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { Size } from "src/view/constants/size";
import { CollageTemplate } from "src/view/plandetail/CollageTemplate";
import { PlaceImageGallery } from "src/view/plandetail/header/PlaceImageGallery";
import { PlaceList } from "src/view/plandetail/header/PlaceList";

type Props = {
    plan: Plan;
    imageSizeOfPlacePhoto?: ImageSize;
    likedPlaceIds: string[];
    onUpdateLikePlace: (placeId: string, isLiked: boolean) => void;
    onCopyPlanUrl?: () => void;
};

export function PlanDetailPageHeader({
    plan,
    likedPlaceIds,
    onUpdateLikePlace,
    onCopyPlanUrl,
}: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isLargerThanHeaderWidth] = useMediaQuery(
        `(min-width: ${Size.PlanDetailHeader.maxW})`
    );
    const placesWithImages = plan.places.filter(
        (place) => place.images.length > 0
    );
    const [activeTab, setActiveTab] = useState("info");

    const mockPlaces = plan.places.map((place, index) => ({
        name: place.name,
        duration: index * 30 + 30,
        imageUrl: place.images[0]?.url || "https://via.placeholder.com/400",
    }));

    const mockIntroduction = "これは紹介文のモックです。";

    return (
        <VStack
            flex={1}
            w="100%"
            h="100%"
            py="32px"
            background="linear-gradient(180deg, #7D6447 0%, #644B2E 70%, #3d2b15 100%)"
            spacing="16px"
            overflow="hidden"
        >
            {activeTab === "info" ? (
                <VStack>
                    <VStack w="100%" flex={1}>
                        <Center
                            px={Size.PlanDetailHeader.px}
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
                        <Box
                            zIndex={1}
                            alignSelf="center"
                            w={!isLargerThanHeaderWidth && "100%"}
                            maxW={
                                isLargerThanHeaderWidth
                                    ? "100%"
                                    : Size.PlanDetailHeader.maxW
                            }
                        >
                            <PlaceList
                                places={plan.places}
                                onClickPlace={({ index }) =>
                                    setCurrentPage(index)
                                }
                            />
                        </Box>
                    </VStack>
                    <VStack
                        w="100%"
                        spacing="16px"
                        alignItems="flex-start"
                        justifyContent="flex-end"
                        zIndex={1}
                    >
                        <VStack
                            alignSelf="center"
                            w="100%"
                            mb="16px"
                            px={Size.PlanDetailHeader.px}
                            maxW={Size.PlanDetailHeader.maxW}
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="20px"
                            >
                                {plan.title}
                            </Text>
                            {plan.author && (
                                <HStack>
                                    <Avatar
                                        name={plan.author.name}
                                        src={plan.author.avatarImage}
                                    />
                                    <Text color="white">
                                        {plan.author.name}
                                    </Text>
                                </HStack>
                            )}
                        </VStack>
                        <HStack
                            w="100%"
                            maxW={Size.PlanDetailHeader.maxW}
                            px={Size.PlanDetailHeader.px}
                            alignSelf="center"
                        >
                            {onCopyPlanUrl && (
                                <HStack
                                    as="button"
                                    px="4px"
                                    py="2px"
                                    backgroundColor="rgba(255,255,255,.8)"
                                    color="#282828"
                                    borderRadius="8px"
                                    onClick={onCopyPlanUrl}
                                    spacing="4px"
                                >
                                    <Icon
                                        w="32px"
                                        h="32px"
                                        color="#5E6382"
                                        as={MdLink}
                                    />
                                    <Text>リンクをコピー</Text>
                                </HStack>
                            )}
                        </HStack>
                    </VStack>
                </VStack>
            ) : (
            <Box background="white">
                <CollageTemplate
                    title={plan.title}
                    places={mockPlaces}
                    introduction={mockIntroduction}
                />
            </Box>
            )}
            <HStack>
                <Button
                    onClick={() => setActiveTab("info")}
                    color="white"
                    background={activeTab === "info" ? "#AC8E6C" : "#F3ECE1"}
                    _hover={{ background: "#AC8E6C" }}
                    opacity={activeTab === "info" ? 1 : 0.6}
                    leftIcon={<Icon as={MdOutlineInfo} />}
                >
                    情報
                </Button>
                <Button
                    onClick={() => setActiveTab("album")}
                    color="white"
                    background={activeTab === "album" ? "linear-gradient(90deg, #505FD0 0%, #7B45B9 23%, #DA2E79 62%, #FDC769 100%)" : "#F3ECE1"}
                    backgroundSize="200% auto"
                    _hover={{ backgroundPosition: "right center", background: "linear-gradient(90deg, #505FD0 0%, #7B45B9 23%, #DA2E79 62%, #FDC769 100%)" }}
                    opacity={activeTab === "album" ? 1 : 0.6}
                    leftIcon={<Icon as={MdOutlineCameraAlt} />}
                >
                    アルバム
                </Button>
            </HStack>
        </VStack>
    );
}
