import { Icon } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FormEvent, useEffect, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { hasValue } from "src/domain/util/null";
import styled from "styled-components";

type Props = {
    defaultValue?: string;
    onSearch: (value: string) => void;
};

export function PlaceSearchBar({ defaultValue = "", onSearch }: Props) {
    const { t } = useTranslation();
    const [lastUsedQuery, setLastUsedQuery] = useState<string | null>(null);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (hasValue(defaultValue)) {
            // 検索が行われないように両方更新をする
            setValue(defaultValue);
            setLastUsedQuery(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        const id = setTimeout(() => {
            // Enter押下で検索した場合は、検索を実行しない
            if (lastUsedQuery === value) {
                return;
            }

            validateAndDoSearch(value);
        }, 1200);

        return () => {
            clearTimeout(id);
        };
    }, [value, lastUsedQuery]);

    const validateAndDoSearch = (value: string) => {
        if (!value || value === "") {
            return;
        }
        setLastUsedQuery(value);
        onSearch(value);
    };

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateAndDoSearch(value);
    };

    return (
        <Container>
            <Icon w="32px" h="32px" as={MdSearch} />
            <Form onSubmit={handleOnSubmit}>
                <TextField
                    autoFocus
                    type="text"
                    placeholder={t("place:searchPlace")}
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
