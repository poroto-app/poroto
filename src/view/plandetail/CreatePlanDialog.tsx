import {Box, Button, useMediaQuery, VStack} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Place } from "src/domain/models/Place";
import { copyObject } from "src/domain/util/object";
import {DialogPositions, FullscreenDialog} from "src/view/common/FullscreenDialog";
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
    const [isMobileSize] = useMediaQuery("(max-width: 500px)");

    useEffect(() => {
        if (place) {
            setPlaceCache(place);
        }
    }, [copyObject(place)]);

    return (
        <FullscreenDialog
            position={isMobileSize ? DialogPositions.BOTTOM : DialogPositions.CENTER}
            visible={place !== null}
            onClickOutside={onClickClose}
            width="100%"
            maxHeight="100%"
            maxWidth="600px"
            padding={isMobileSize ? "0": "16px"}
        >
            <Box
                w="100%"
                h="100%"
                maxH="100%"
                backgroundColor="white"
                borderRadius="20px"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                overflowY="hidden"
            >
                <VStack
                    w="100%"
                    h="100%"
                    maxHeight="100%"
                    px="16px"
                    py="24px"
                    overflowY="scroll"
                >
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
                        estimatedStayDuration={placeCache.estimatedStayDuration}
                    />
                    <VStack w="100%" mt="16px">
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
