import { Skeleton } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import styled from "styled-components";

export const PlanThumbnail = ({ imageUrls }: { imageUrls: string[] }) => {
    imageUrls = imageUrls.slice(0, 4);

    return (
        <SlideContainer>
            {imageUrls.map((url, i) => (
                <SlideItem key={i}>
                    <Thumbnail src={url} />
                </SlideItem>
            ))}
            {/*TODO: 画像が無いときのプレースホルダーを用意する*/}
            {imageUrls.length > 0 && (
                <Skeleton
                    position="absolute"
                    top="0"
                    right="0"
                    bottom="0"
                    left="0"
                    zIndex="-1"
                />
            )}
        </SlideContainer>
    );
};

const SlideContainer = styled(Splide)`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    & > .splide__track {
        height: 100%;
    }
`;

const SlideItem = styled(SplideSlide)`
    width: 100%;
    height: 100%;
`;

const Thumbnail = styled.img`
    overflow: clip;
    height: 100%;
    width: 100%;
    object-fit: cover;
`;
