import { Center, ChakraProps, HTMLChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    backgroundColor: string;
    children?: ReactNode;
} & ChakraProps &
    HTMLChakraProps<"button">;

export function ButtonWithBlur(props: Props) {
    const toRgb = (
        color: string
    ): { red: number; green: number; blue: number } => {
        // if color is type of rgb() return it
        if (color.startsWith("rgb")) {
            const [red, green, blue] = color
                .slice(4, -1)
                .split(",")
                .map((v) => parseInt(v));
            return { red, green, blue };
        }

        // if color is hex convert it to rgb
        if (color[0] === "#") {
            const hex = color.slice(1);
            const red = parseInt(hex.slice(0, 2), 16);
            const green = parseInt(hex.slice(2, 4), 16);
            const blue = parseInt(hex.slice(4, 6), 16);
            return { red, green, blue };
        }
    };

    const color = toRgb(props.backgroundColor);

    return (
        <Center
            {...props}
            boxShadow={`0px 0px 20px 0px rgba(${color.red},${color.green},${color.blue},.6)`}
            as="button"
        >
            {props.children}
        </Center>
    );
}
