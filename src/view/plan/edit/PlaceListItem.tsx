import { HStack, Icon, Text } from "@chakra-ui/react";
import {
    DraggableAttributes,
    DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { forwardRef } from "react";
import { MdDragIndicator } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import styled from "styled-components";

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
                <HStack flex={1}>
                    <img
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
                <DragHandle
                    {...draggableAttributes}
                    {...draggableListeners}
                    ref={ref}
                >
                    <Icon w="24px" h="24px" as={MdDragIndicator} color="gray" />
                </DragHandle>
            </HStack>
        );
    }
);

const DragHandle = styled.div`
    // MEMO: touch-action: none とすることで、spで操作するときにスクロールしないようにする
    touch-action: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    &:focus-visible,
    &:hover {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
`;
