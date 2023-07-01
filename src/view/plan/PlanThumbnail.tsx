import { Skeleton } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import styled from "styled-components";

export const PlanThumbnail = ({ imageUrls }: { imageUrls: string[] }) => {
    imageUrls = imageUrls.slice(0, 4);

    return (
        <SlideContainer options={{ drag: imageUrls.length > 1 }}>
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

    & > .splide__pagination > li > button {
        opacity: 1;
    }

    & > .splide__arrows {
        opacity: 0;
        & > .splide__arrow {
            &:disabled {
                opacity: 0;
            }

            &:hover {
                opacity: 1;
            }

            > svg {
                width: 12px;
                height: 12px;
            }
        }
    }

    // pcでホバーをしたときだけ矢印を表示する
    @media screen and (min-width: 700px) {
        &:hover {
            & > .splide__arrows {
                opacity: 1;
            }
        }
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
