import { Box, Button, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Colors } from "src/constant/color";
import { Place } from "src/domain/models/Place";
import { copyObject } from "src/domain/util/object";
import {
    DialogPositions,
    FullscreenDialog,
} from "src/view/common/FullscreenDialog";
import { RoundedButton } from "src/view/common/RoundedButton";
import { PlacePreview } from "src/view/plandetail/PlacePreview";

type Props = {
    place: Place | null;
    onClickClose: () => void;
    onClickCreatePlan: (place: Place) => void;
};

export const CreatePlanDialog = ({
    place,
    onClickClose,
    onClickCreatePlan,
}: Props) => {
    const { t } = useTranslation();
    // ダイアログを閉じるときに、placeをnullにするとエラーになってしまうため
    // placeのキャッシュを作成し、それを表示する
    const [placeCache, setPlaceCache] = useState(place);

    useEffect(() => {
        if (place) {
            setPlaceCache(place);
        }
    }, [copyObject(place)]);

    if (!placeCache) return <></>;

    return (
        <FullscreenDialog
            position={DialogPositions.BOTTOM}
            visible={place !== null && place !== undefined}
            onClickOutside={onClickClose}
            width={800}
            maxWidth="100%"
        >
            <Box
                w="100%"
                backgroundColor="white"
                borderRadius={{ base: "20px 20px 0 0", md: "20px" }}
                mb={{ base: "0", md: "12px" }}
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            >
                <VStack
                    w="100%"
                    maxH="80vh"
                    px="16px"
                    pt="24px"
                    pb="32px"
                    spacing="32px"
                    overflowY="auto"
                >
                    <Box w="100%" flex={1}>
                        <PlacePreview
                            placeId={placeCache.id}
                            googlePlaceId={placeCache.googlePlaceId}
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
                        <RoundedButton onClick={() => onClickCreatePlan(place)}>
                            {t("plan:createPlanFromThisPlace")}
                        </RoundedButton>
                        <Button
                            w="100%"
                            color={Colors.primary["400"]}
                            variant="ghost"
                            onClick={onClickClose}
                            _hover={{
                                backgroundColor: "none",
                            }}
                        >
                            {t("common:cancel")}
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </FullscreenDialog>
    );
};
