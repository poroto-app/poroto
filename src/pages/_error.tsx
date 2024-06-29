import { Error } from "src/view/common/Error";
import {GetStaticProps} from "next";

export default function ErrorPage() {
    return <Error />;
}

export const getInitialProps: GetStaticProps<{}> = async () => {
    return {
        props: {},
    };
}