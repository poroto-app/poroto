import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import {
    DraggableAttributes,
    DraggableSyntheticListeners,
} from "@dnd-kit/core";
import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";
import { Place } from "src/domain/models/Place";

type Props = {
    place: Place;
    draggableAttributes?: DraggableAttributes;
    draggableListeners?: DraggableSyntheticListeners;
};

export function PlaceListItem({
    place,
    draggableListeners,
    draggableAttributes,
}: Props) {
    return (
        <HStack w="100%" spacing={4} backgroundColor="white">
            <Box {...draggableAttributes} {...draggableListeners}>
                <Icon w="24px" h="24px" as={MdDragIndicator} color="gray" />
            </Box>
            <HStack>
                <Image
                    width={48}
                    height={48}
                    src={place.imageUrls[0]}
                    alt="place_thumbnail"
                    style={{
                        objectFit: "cover",
                        overflow: "hidden",
                        borderRadius: 5,
                        width: 48,
                        height: 48,
                    }}
                />
                <Text>{place.name}</Text>
            </HStack>
        </HStack>
    );
}
