import styled from "styled-components";

export function BannerAd() {
    return (
        <StyledDiv>
            <InnerDiv1>スポンサーリンク</InnerDiv1>
            <InnerDiv2>広告</InnerDiv2>
            <StyledIns
                className="adsbygoogle"
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={process.env.ADSENSE_ClIENT}
                data-ad-slot={process.env.ADSENSE_SLOT}
                data-adtest={
                    process.env.NODE_ENV === "production" ? "off" : "on"
                }
            ></StyledIns>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
`;

const InnerDiv1 = styled.div`
    padding: 10px;
    font-size: 13px;
    text-align: left;
`;

const InnerDiv2 = styled.div`
    padding: 10px 10px;
    border: 1px solid #333;
`;

const StyledIns = styled.ins`
    display: block;
    text-align: center;
`;
