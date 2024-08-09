import { IconProps } from "@tamagui/helpers-icon";
import { NamedExoticComponent, useRef, useState } from "react";
import { Padding } from "src/constant/padding";
import { XStack } from "tamagui";

export const SelectButton = ({
    color,
    onClick,
    icon: Icon,
}: {
    color: string;
    onClick: () => void;
    icon: NamedExoticComponent<IconProps>;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [hover, setHover] = useState(false);

    const handleOnClick = () => {
        // MEMO: ボタンにCSSのactive状態が適用されるのはボタンを押している間だけなので、
        // Refを使ってフォーカス状態を長めに発生させる
        buttonRef.current.focus();
        setTimeout(() => buttonRef?.current?.blur(), 200);
        onClick();
    };

    return (
        <XStack
            tag="button"
            flex={1}
            alignItems="center"
            justifyContent="center"
            backgroundColor="white"
            borderColor={color}
            borderWidth={2}
            borderRadius={100}
            padding={Padding.p8}
            hoverStyle={{
                backgroundColor: color,
            }}
            onHoverIn={() => setHover(true)}
            onHoverOut={() => setHover(false)}
            pressStyle={{
                scale: 0.8,
            }}
            animation="quicker"
            ref={buttonRef}
            onPress={handleOnClick}
        >
            <Icon size={32} color={hover ? "white" : color} />
        </XStack>
    );
};
