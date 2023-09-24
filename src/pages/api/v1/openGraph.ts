import axios, { AxiosError } from "axios";
import { decode } from "html-entities";
import { NextApiRequest, NextApiResponse } from "next";

export type Request = {
    url: string;
};
export type Response = {
    url: string;
    title: string | null;
    description: string | null;
    image: string | null;
    type: string | null;
};

const unescapeHtml = (html: string) => {
    return decode(html);
};

const fetchOgData = async (url: string) => {
    let html: string;
    try {
        const res = await axios.get(url);
        html = res.data;
    } catch (e) {
        if ([403, 404].includes((e as AxiosError).response?.status)) return {};
        throw e;
    }

    const openGraphData = {};

    const ogTags = html.match(
        /<meta\s+property="og:([^"]+)"\s+content="([^"]+)"\s*\/?>/g
    );
    if (ogTags) {
        ogTags.forEach((tag) => {
            const matches = tag.match(
                /<meta\s+property="og:([^"]+)"\s+content="([^"]+)"\s*\/?>/
            );
            if (matches && matches.length === 3) {
                const propertyName = matches[1];
                const propertyValue = matches[2];
                openGraphData[propertyName] = unescapeHtml(propertyValue);
            }
        });
    }

    const twitterTags = html.match(
        /<meta\s+name="twitter:([^"]+)"\s+content="([^"]+)"\s*\/?>/g
    );
    if (twitterTags) {
        twitterTags.forEach((tag) => {
            const matches = tag.match(
                /<meta\s+name="twitter:([^"]+)"\s+content="([^"]+)"\s*\/?>/
            );
            if (matches && matches.length === 3) {
                const propertyName = matches[1];
                const propertyValue = matches[2];
                openGraphData[propertyName] = unescapeHtml(propertyValue);
            }
        });
    }

    return openGraphData;
};

export default async function OpenGraph(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== "POST") return res.status(405).end();

    const { url } = req.body as Request;
    const openGraphData = await fetchOgData(url);

    res.status(200).json({
        url,
        title: openGraphData["title"] || null,
        description: openGraphData["description"] || null,
        image: openGraphData["image"] || null,
        type: openGraphData["type"] || null,
    });
}
