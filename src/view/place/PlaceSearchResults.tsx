import styled from "styled-components";
import {Text, VStack} from "@chakra-ui/react";

type Props = {
    places: {
        id: string,
        name: string,
        address: string,
    }[]
}

export function PlaceSearchResults({places}: Props) {
    return <VStack w="100%">
        {
            places.map((place, i) => <ListItem key={i}>
                <Text>{place.name}</Text>
                <Text fontSize="0.8rem" opacity="0.7">{place.address}</Text>
            </ListItem>)
        }
    </VStack>
}

const ListItem = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .15);
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
`;