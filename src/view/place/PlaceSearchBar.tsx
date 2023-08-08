import { Icon } from "@chakra-ui/react";
import {FormEvent, useEffect, useState} from "react";
import { MdClose, MdSearch } from "react-icons/md";
import styled from "styled-components";

type Props = {
    onSearch: (value: string) => void;
};

export function PlaceSearchBar({ onSearch }: Props) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const id = setTimeout(() => {
            validateAndDoSearch(value);
        }, 1200);

        return () => {
            clearTimeout(id);
        };
    }, [value]);

    const validateAndDoSearch = (value: string) => {
        if (!value || value === "") {
            return;
        }
        onSearch(value);
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateAndDoSearch(value);
    }

    return (
        <Container>
            <Icon w="32px" h="32px" as={MdSearch} />
            <Form onSubmit={handleOnSubmit}>
                <TextField
                    autoFocus
                    type="text"
                    placeholder="場所を検索"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
            </Form>
            {value !== "" && (
                <Icon w="32px" onClick={() => setValue("")} as={MdClose} />
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    column-gap: 16px;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 50px;
    padding: 4px 8px;
    background: white;
`;

const TextField = styled.input`
    width: 100%;
    border: none;
    outline: none;
`;

const Form = styled.form`
    width: 100%;
`;
