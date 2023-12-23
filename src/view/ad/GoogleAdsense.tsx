import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
    slot: string;
    style?: React.CSSProperties;
    format?: string;
    layout?: string;
    responsive?: string;
};

export const GoogleAdsense = ({
    slot,
    style = { display: "block" },
    format,
    layout,
    responsive = "false",
}: Props): JSX.Element => {
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
        <div key={asPath}>
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-layout={layout}
                data-adtest={
                    process.env.APP_ENV === "production" ? "off" : "on"
                }
                data-ad-client={process.env.ADSENSE_CLIENT}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
};
