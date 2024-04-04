import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
    slot: string;
    parentStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    // https://support.google.com/adsense/answer/9183460
    format?: "auto" | "fluid" | "horizontal" | "rectangle" | "vertical";
    layout?: string;
    // https://support.google.com/adsense/answer/9189961
    responsive?: "true" | "false";
};

export const GoogleAdsense = (
    {
        slot,
        parentStyle = { display: "block" },
        style = { display: "block" },
        format,
        layout,
        responsive = "false",
    }: Props
): JSX.Element => {
    const { asPath } = useRouter();

    useEffect(() => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ((window as any).adsbygoogle =
                (window as any).adsbygoogle || []).push({});
        } catch (error) {
            // no-op
        }
    }, [asPath]);

    return (
        <div
            key={asPath}
            style={{
                ...parentStyle,
                display: "block",
            }}
        >
            <ins
                className="adsbygoogle"
                style={{ ...style, display: "block" }}
                data-ad-format={format}
                data-ad-layout-key={layout}
                data-ad-client={process.env.ADSENSE_CLIENT}
                data-ad-slot={slot}
                data-adtest={
                    process.env.APP_ENV === "production" ? "off" : "on"
                }
                data-full-width-responsive={responsive}
            />
        </div>
    );
};
