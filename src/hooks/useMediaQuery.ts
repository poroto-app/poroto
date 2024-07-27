import { useWindowDimensions } from "tamagui";

// webの場合は $sm のようなプロパティを利用することで、CSSによる分岐を行うことができる
// native の場合は、$sm のようなプロパティを利用することができないため、useMediaQuery を利用する
// なお、値は `tamagui.config.ts` で定義された値を利用する
export const useMediaQuery = () => {
    const { width, height } = useWindowDimensions();

    return {
        xs: width <= 700,
        gtXs: width > 700,
        sm: width < 860,
        gtSm: width >= 860,
        md: width < 980,
        gtMd: width >= 980,
        lg: width < 1120,
        gtLg: width >= 1120,
        short: height <= 820,
        tall: height > 820,
    };
};
