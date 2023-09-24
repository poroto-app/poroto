import { MDXProvider } from "@mdx-js/react";
import { ReactNode } from "react";
import {Box} from "@chakra-ui/react";

type ComponentProps = {
    children?: ReactNode;
};

const components = {
    h1: (props: ComponentProps) => (
        <h1
            style={{
                color: "rgb(8, 19, 26)",
                fontWeight: "bold",
                fontSize: 20,
            }}
            {...props}
        />
    ),
    h2: (props: ComponentProps) => (
        <h2
            style={{
                color: "rgb(8, 19, 26)",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 45,
            }}
            {...props}
        />
    ),
    p: (props: ComponentProps) => (
        <p
            style={{
                color: "rgb(8, 19, 26)",
                fontSize: 16,
                lineHeight: "32px",
                marginTop: 30,
                marginBottom: 30,
            }}
            {...props}
        />
    ),
    img: (props: ComponentProps) => (
        <Box w="100%" my="30px">
            <a href={props["src"]} target="_blank">
                <img{...props} loading="lazy"/>
            </a>
        </Box>
    ),
    a: (props: ComponentProps) => (
        <a
            style={{
                color: "rgb(8, 19, 26)",
                textDecoration: "underline",
            }}
            {...props}
        />
    ),
};

export function MDXBlogProvider({ children }: { children?: ReactNode }) {
    return <MDXProvider components={components}>{children}</MDXProvider>;
}
