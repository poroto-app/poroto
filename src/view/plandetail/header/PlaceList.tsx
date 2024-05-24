import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { Asset } from "src/view/constants/asset";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";

type Props = {
    places: Place[];
    onClickPlace: (props: { index: number; place: Place }) => void;
};

export function PlaceList({ places, onClickPlace }: Props) {
    return (
        <HStack
            w="100%"
            overflowX="auto"
            whiteSpace="nowrap"
            /*親要素で余白をつけると、スクロール時に範囲外が切れてしまう*/
            px={Size.PlanDetailHeader.px}
            /*スクロールバーと要素間の余白*/
            pb={isPC && Size.PlanDetailHeader.PlaceList.scrollBarHeight + "px"}
            sx={{
                scrollbarColor: "rgba(255,255,255,0.6) rgba(0,0,0,.2)",
                scrollbarWidth: "thin",

                "::-webkit-scrollbar": {
                    width: "100px",
                    height: "12px",
                    display: !isPC && "none",
                },

                "::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(0,0,0,.2)",
                    borderRadius: "100px",
                },

                "::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderRadius: "100px",
                },
            }}
        >
            {places.map((place, i) => (
                <Box display="inline-block" key={i}>
                    <PlaceCard
                        place={place}
                        onClick={() =>
                            onClickPlace({
                                index: i,
                                place: place,
                            })
                        }
                    />
                </Box>
            ))}
        </HStack>
    );
}

function PlaceCard({ place, onClick }: { place: Place; onClick: () => void }) {
    const image =
        place.images.length > 0
            ? getImageSizeOf(ImageSizes.Small, place.images[0])
            : Asset.image.notFound;

    return (
        <VStack
            as="button"
            borderRadius="5px"
            backgroundColor="rgba(0, 0, 0, 0.3)"
            overflow="hidden"
            w="200px"
            h={Size.PlanDetailHeader.PlaceList.height + "px"}
            userSelect="none"
            onClick={onClick}
        >
            <Box w="100%" flex={1} overflowY="hidden">
                <ImageWithSkeleton src={image} />
            </Box>
            <Text
                w="100%"
                color="white"
                textAlign="center"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {place.name}
            </Text>
        </VStack>
    );
}
