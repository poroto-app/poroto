import { Link } from "@chakra-ui/next-js";
import { Skeleton } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
    imageUrls: string[];
    link?: string;
};

export const PlanThumbnail = ({ imageUrls, link }: Props) => {
    imageUrls = imageUrls.slice(0, 4);

    return (
        <SlideContainer
            options={{
                drag: imageUrls.length > 1,
                arrows: imageUrls.length > 1,
            }}
        >
            {imageUrls.map((url, i) => (
                <SlideItem key={i}>
                    {/*ページングのボタンを押したときにページ遷移しないようにするため*/}
                    {link ? (
                        <LinkWrapper href={link}>
                            <Thumbnail src={url} />
                        </LinkWrapper>
                    ) : (
                        <Thumbnail src={url} />
                    )}
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

function LinkWrapper({
    href,
    children,
}: {
    href?: string;
    children?: ReactNode;
}) {
    if (href)
        return (
            <Link href={href} w="100%" h="100%">
                {children}
            </Link>
        );
    return <>{children}</>;
}

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
        box-shadow: 0 0 0 1px transparent, 0 0 0 4px transparent,
            0 2px 4px rgba(0, 0, 0, 0.18);
    }

    & > .splide__arrows {
        opacity: 0;

        & > .splide__arrow {
            background-color: white;
            box-shadow: 0 0 0 1px transparent, 0 0 0 4px transparent,
                0 2px 4px rgba(0, 0, 0, 0.18);
            z-index: 1;

            &:disabled {
                opacity: 0;
            }

            &:hover {
                opacity: 1;
                z-index: 99;
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
