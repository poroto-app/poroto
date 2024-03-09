import { Box, Button, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Place } from "src/domain/models/Place";
import { copyObject } from "src/domain/util/object";
import {
    DialogPositions,
    FullscreenDialog,
} from "src/view/common/FullscreenDialog";
import { RoundedButton } from "src/view/common/RoundedButton";
import { Colors } from "src/view/constants/color";
import { PlacePreview } from "src/view/plandetail/PlacePreview";

type Props = {
    place: Place | null;
    onClickClose: () => void;
    onClickCreatePlan: (place: Place) => void;
};

export const CreatePlanDialog = ({ place, onClickClose }: Props) => {
    // ダイアログを閉じるときに、placeをnullにするとエラーになってしまうため
    // placeのキャッシュを作成し、それを表示する
    const [placeCache, setPlaceCache] = useState(place);

    useEffect(() => {
        if (place) {
            setPlaceCache(place);
        }
    }, [copyObject(place)]);

    return (
        <FullscreenDialog
            position={DialogPositions.BOTTOM}
            visible={place !== null}
            onClickOutside={onClickClose}
            width="100%"
            maxWidth="600px"
        >
            <Box
                w="100%"
                backgroundColor="white"
                borderRadius="20px 20px 0 0"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            >
                <VStack
                    w="100%"
                    maxH="80vh"
                    px="16px"
                    pt="24px"
                    pb="48px"
                    spacing="32px"
                    overflowY="auto"
                >
                    <Box w="100%" flex={1}>
                        <PlacePreview
                            placeId={placeCache.id}
                            googlePlaceId={placeCache.googlePlaceId}
                            googlePlaceReviews={placeCache.googlePlaceReviews}
                            name={placeCache.name}
                            images={placeCache.images}
                            categories={placeCache.categories}
                            priceRange={placeCache.priceRange}
                            // TODO: いいね機能の実装
                            like={false}
                            likeCount={placeCache.likeCount}
                            estimatedStayDuration={
                                placeCache.estimatedStayDuration
                            }
                        />
                    </Box>
                    <VStack w="100%">
                        <RoundedButton>この場所からプランを作る</RoundedButton>
                        <Button
                            w="100%"
                            color={Colors.primary["400"]}
                            variant="ghost"
                            onClick={onClickClose}
                            _hover={{
                                backgroundColor: "none",
                            }}
                        >
                            キャンセル
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </FullscreenDialog>
    );
};
