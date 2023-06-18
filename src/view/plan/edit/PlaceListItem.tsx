import { Center, HStack, Icon, Text } from "@chakra-ui/react";
import {
    DraggableAttributes,
    DraggableSyntheticListeners,
} from "@dnd-kit/core";
import Image from "next/image";
import { forwardRef } from "react";
import { MdDragIndicator } from "react-icons/md";
import { Place } from "src/domain/models/Place";

type Props = {
    place: Place;
    draggableAttributes?: DraggableAttributes;
    draggableListeners?: DraggableSyntheticListeners;
};

export const PlaceListItem = forwardRef<HTMLDivElement, Props>(
    function Component(
        { place, draggableAttributes, draggableListeners },
        ref
    ) {
        return (
            <HStack w="100%" spacing={4} backgroundColor="white">
                <HStack userSelect="none" flex={1}>
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
                <Center
                    {...draggableAttributes}
                    {...draggableListeners}
                    ref={ref}
                >
                    <Icon w="24px" h="24px" as={MdDragIndicator} color="gray" />
                </Center>
            </HStack>
        );
    }
);
