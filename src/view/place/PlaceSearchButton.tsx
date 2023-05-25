import styled from "styled-components";
import Link from "next/link";
import { Routes } from "src/view/constants/router";
import { Icon, Text } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import React from "react";

export function PlaceSearchButton() {
    return (
        <Link href={Routes.places.search} style={{ width: "100%" }}>
            <Container>
                <Icon w="32px" h="32px" as={MdSearch} />
                <Text>どこに行く？</Text>
            </Container>
        </Link>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 50px;
    width: 100%;
    padding: 4px 16px;
    box-shadow: 0 0 20px #f0f0f0;
`;
