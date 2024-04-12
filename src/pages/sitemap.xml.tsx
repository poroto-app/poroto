import { GetServerSideProps } from "next";
import { Routes } from "src/view/constants/router";

type Page = {
    url: string;
};

function generateSiteMap({ pages }: { pages: Page[] }): string {
    const pageMap = pages.map(
        (page) => `
        <url>
            <loc>${page.url}</loc>
        </url>`
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pageMap.join("")}
   </urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const protocol = process.env.APP_PROTOCOL;
    const host = process.env.APP_HOST;
    const baseUrl = `${protocol}://${host}`;

    const sitemap = generateSiteMap({
        pages: [
            { url: `${baseUrl}/` },
            { url: `${baseUrl}${Routes.plans.interest()}` },
            {
                url: `${baseUrl}${Routes.places.search({
                    skipCurrentLocation: false,
                })}`,
            },
        ],
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default function SiteMap() {
    return <></>;
}
