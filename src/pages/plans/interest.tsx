import Head from "next/head";
import { createParam } from "solito";
import { PageMetaData } from "src/constant/meta";
import { PlanCreateInterestPage } from "src/view/interest/PlanCreateInterestPage";

const { useParams } = createParam<{ location?: string }>();

export default function Page() {
    const { params } = useParams();

    return (
        <>
            <Head>
                <title>
                    {PageMetaData().plans.interest.title(
                        params.location !== "true"
                    )}
                </title>
                <meta
                    name="description"
                    content={PageMetaData().plans.interest.description}
                />
            </Head>
            <PlanCreateInterestPage />
        </>
    );
}
