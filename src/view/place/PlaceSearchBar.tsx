import {Icon} from "@chakra-ui/react";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {MdSearch} from "react-icons/md";

type Props = {
    onSearch: (value: string) => void;
}

export function PlaceSearchBar({onSearch}: Props) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const id = setTimeout(() => {
            if (value === "") return;
            onSearch(value);
        }, 1200);

        return () => {
            clearTimeout(id);
        }
    }, [value]);

    return <Container>
        <Icon w="32px" h="32px" as={MdSearch}/>
        <TextField
            autoFocus
            type="text"
            placeholder="場所を検索"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
        />
    </Container>
}

const Container = styled.div`
  width: 100%;
  display: flex;
  column-gap: 16px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 50px;
  padding: 4px 8px;
  background: white;
`;

const TextField = styled.input`
  width: 100%;
  border: none;
  outline: none;
`;