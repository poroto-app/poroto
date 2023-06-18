import { HStack, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { MdDragIndicator } from "react-icons/all";
import { Place } from "src/domain/models/Place";

type Props = {
    place: Place;
};

export function PlaceListItem({ place }: Props) {
    return (
        <HStack w="100%" spacing={4}>
            <Icon w="24px" h="24px" as={MdDragIndicator} color="gray" />
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
