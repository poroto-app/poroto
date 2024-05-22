import {
    Box,
    Center,
    CircularProgress,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import TowingIcon from "src/view/assets/svg/towing.svg";
import {
    DialogPositions,
    FullscreenDialog,
} from "src/view/common/FullscreenDialog";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Colors } from "src/view/constants/color";

type Props = {
    visible: boolean;
    places: Place[] | null;
    status?: RequestStatus | null;
    onClose: () => void;
    onRetry?: () => void;
    onSelectPlace?: ({ place }: { place: Place }) => void;
};

export function PlaceRecommendationDialog({
    places,
    visible,
    status = RequestStatuses.FULFILLED,
    onClose,
    onRetry,
    onSelectPlace,
}: Props) {
    return (
        <FullscreenDialog
            position={DialogPositions.BOTTOM}
            width="800px"
            maxWidth="100%"
            height="min(80vh, 600px)"
            maxHeight="min(80vh, 600px)"
            visible={visible}
            onClickOutside={onClose}
        >
            <Center w="100%" h="100%">
                <RoundedDialog h="100%">
                    <VStack
                        h="100%"
                        maxH="100%"
                        px="16px"
                        py="32px"
                        overflow="scroll"
                        spacing="24px"
                    >
                        <HStack w="100%" position="relative">
                            <Text
                                w="100%"
                                fontWeight="bold"
                                fontSize="20px"
                                textAlign="center"
                            >
                                おすすめの観光地
                            </Text>
                            <Center
                                cursor="pointer"
                                borderRadius="100%"
                                backgroundColor="rgba(0,0,0,.05)"
                                w="32px"
                                h="32px"
                                position="absolute"
                                right={0}
                                onClick={onClose}
                            >
                                <Icon
                                    as={MdClose}
                                    color="rgba(0,0,0,.5)"
                                    w="24px"
                                    h="24px"
                                />
                            </Center>
                        </HStack>
                        <Box flex={1} w="100%">
                            <PlaceList
                                places={places}
                                status={status}
                                onRetry={onRetry}
                                onSelectPlace={onSelectPlace}
                            />
                        </Box>
                    </VStack>
                </RoundedDialog>
            </Center>
        </FullscreenDialog>
    );
}

const Loading = () => {
    return (
        <Center w="100%" h="100%">
            <VStack spacing="16px">
                <CircularProgress
                    isIndeterminate
                    color={Colors.primary[400]}
                    size="32px"
                />
                <Text>おすすめの観光地を探しています...</Text>
            </VStack>
        </Center>
    );
};

const Error = ({ onRetry }: { onRetry?: () => void }) => {
    return (
        <Center w="100%" h="100%">
            <VStack w="100%" spacing="16px">
                <TowingIcon viewBox="0 0 648 648" height="300px" />
                <Text>おすすめの観光地を取得中にエラーが発生しました。</Text>
                {onRetry && (
                    <RoundedButton onClick={onRetry}>再試行</RoundedButton>
                )}
            </VStack>
        </Center>
    );
};

const PlaceList = ({
    places,
    status,
    onRetry,
    onSelectPlace,
}: {
    places: Place[] | null;
    status: RequestStatus;
    onRetry?: () => void;
    onSelectPlace: ({ place }: { place: Place }) => void;
}) => {
    if (status === RequestStatuses.REJECTED) {
        return <Error onRetry={onRetry} />;
    }

    if (!hasValue(places)) {
        return <Loading />;
    }

    return (
        <SimpleGrid columns={2} gridRowGap="32px" spacing="16px" py="24px">
            {places
                .filter((p) => p.images.length > 0)
                .map((place) => (
                    <VStack
                        w="100%"
                        cursor="pointer"
                        onClick={() => onSelectPlace({ place })}
                    >
                        <Box
                            w="100%"
                            maxW="100%"
                            h="300px"
                            borderRadius="10px"
                            overflow="hidden"
                        >
                            <ImageWithSkeleton
                                src={place.images[0].default}
                                isGoogleImage={place.images[0].isGoogleImage}
                                alt={place.name}
                            />
                        </Box>
                        <Text fontWeight="bold">{place.name}</Text>
                    </VStack>
                ))}
        </SimpleGrid>
    );
};
