import { GetServerSideProps } from "next";

const robotsText = ({ sitemap }: { sitemap: string }) => `User-agent: *
Allow: /
SiteMap: ${sitemap}`;

const robotsTextStaging = () => `User-agent: *
Disallow: /`;

const generateRobotsTxt = (): string => {
    if (process.env.APP_ENV === "staging") {
        return robotsTextStaging();
    }

    return robotsText({
        sitemap: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}/sitemap.xml`,
    });
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader("Content-Type", "text/plain");
    res.write(generateRobotsTxt());
    res.end();

    return {
        props: {},
    };
};

export default function RobotsTxt() {
    return <></>;
}
