import { Search, X } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Padding } from "src/constant/padding";
import { hasValue } from "src/domain/util/null";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { Form, Input, XStack } from "tamagui";

type Props = {
    defaultValue?: string;
    onSearch: (value: string) => void;
};

export function PlaceSearchBar({ defaultValue = "", onSearch }: Props) {
    const { t } = useAppTranslation();
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

    const handleOnSubmit = () => {
        validateAndDoSearch(value);
    };

    return (
        <XStack
            w="100%"
            gap={Padding.p16}
            alignItems="center"
            borderWidth={1}
            borderColor="rgba(0, 0, 0, 0.15)"
            borderRadius={50}
            py={Padding.p4}
            px={Padding.p8}
            backgroundColor="white"
        >
            <Search size={32} color="#1a202c" p={Padding.p4} />
            <Form flex={1} onSubmit={handleOnSubmit}>
                <Input
                    autoFocus
                    unstyled
                    outlineWidth={0}
                    placeholder={t("place:searchPlace")}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />
            </Form>
            {value !== "" && (
                <X
                    size={24}
                    color="#1a202c"
                    p={Padding.p4}
                    cursor="pointer"
                    onPress={() => setValue("")}
                />
            )}
        </XStack>
    );
}
