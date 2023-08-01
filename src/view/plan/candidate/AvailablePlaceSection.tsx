import { HStack, Text, VStack } from "@chakra-ui/react";
import { Place } from "src/domain/models/Place";
import { createArrayWithSize } from "src/domain/util/array";
import { AvailablePlace } from "src/view/plan/candidate/AvailablePlace";

type Props = {
    places: Place[] | null;
    isFetching: boolean;
};

export function AvailablePlaceSection({ places, isFetching }: Props) {
    if (!places && !isFetching) return <></>;

    return (
        <VStack w="100%" maxW="600px" alignItems="flex-start">
            <Text fontWeight="bold" fontSize="20px">
                他の場所からプランを作る
            </Text>
            <HStack flexWrap="wrap">
                {places
                    ? places.map((place, i) => (
                          <AvailablePlace place={place} key={i} />
                      ))
                    : createArrayWithSize(5).map((_, i) => (
                          <AvailablePlace key={i} place={null} />
                      ))}
            </HStack>
        </VStack>
    );
}
