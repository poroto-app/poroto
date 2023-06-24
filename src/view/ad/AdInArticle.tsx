type Props = {
    adSlot: string;
};

export function AdInArticle({ adSlot }: Props) {
    return (
        <ins
            className="adsbygoogle"
            style={{ width: "100%", display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
            data-ad-client={process.env.ADSENSE_CLIENT}
            data-ad-slot={adSlot}
        />
    );
}
