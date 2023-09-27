import Mdx from "src/mdx/pr/rcl.mdx";
import { MdxBlogLayout } from "src/view/mdx/MdxBlogLayout";
import { MdxMeta } from "src/view/mdx/MdxMeta";

export const metadata: MdxMeta = {
    title: "大事なおねがいがあります！！",
    date: "2023-09-27 15:00:00 +0900",
    author: "benny",
    authorImage:
        "https://storage.googleapis.com/poroto-blog-asset-bucket/user/benny.webp",
    image: "https://storage.googleapis.com/poroto-blog-asset-bucket/pr/rcl/thumbnail.jpg",
};

export default function Page() {
    return (
        <MdxBlogLayout meta={metadata}>
            <Mdx />
        </MdxBlogLayout>
    );
}
