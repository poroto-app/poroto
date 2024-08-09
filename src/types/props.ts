import { ReactNode } from "react";
import { GeoLocation } from "src/data/graphql/generated";
import { ImageSize, Image as ImageType } from "src/domain/models/Image";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import { Plan } from "src/domain/models/Plan";

export type CategorySelectSlideViewProps = {
    category: LocationCategoryWithPlace;
    interactiveAnimation?: boolean;
};

export type CreatePlanLocationMapProps = {
    rangeInKm: number;
    mapCenter: GeoLocation;
    location?: GeoLocation;

    onClickLocation?: (location: GeoLocation) => void;
};

export type FadeInFadeOutTransitionProps = {
    duration?: number;
    children?: ReactNode;
};

export type HorizontalScrollableListProps = {
    scrollAmount?: number;
    pageButtonOffsetY?: number;
    px?: number;
    spacing?: number;
    alignItems?: string;
    pageButtonVisible?: boolean;
    roundedEdgeCorner?: boolean;
    edgeCornerRadius?: number;
    pageButtonOpacity?: number;
    children?: ReactNode;
};

export type NavBarProps = {
    safeAreaInsetTop?: number;
    canGoBack?: boolean;
    onBack?: () => void;
    // 履歴がないときに戻るときのデフォルトのパス
    defaultPath?: string;
};

export type ImageWithSkeletonProps = {
    src: string;
    w?: number | "100%";
    h?: number | "100%";
    alt?: string;
    isGoogleImage?: boolean;
    attributionToBottom?: boolean;
    attributionPaddingY?: string;
    objectFit?: "contain" | "cover" | "fill" | "none";
    onClick?: () => void;
};

export type ImageSliderPreviewProps = {
    images: ImageType[];
    imageSize?: ImageSize;
    href?: string;
    draggable?: boolean;
    borderRadius?: number;
    onClickImage?: (image: ImageType) => void;
};

export type ImageWithSVGProps = {
    src: string;
    w?: number | "100%";
    h?: number | "100%";
    maxWidth?: number | "100%";
    maxHeight?: number | "100%";
    alt?: string;
    objectFit?: "contain" | "cover";
};

export type LottiePlayerProps = {
    animationData: any;
    loop?: boolean;
    segments?: {
        start: number;
        end: number;
    };
    transform?: string;
};

export type PlanListProps = {
    plans: Plan[] | null;

    isLoading?: boolean;
    canLoadMore?: boolean;
    loadMore?: () => void;

    px?: number;
    grid?: boolean;
    numPlaceHolders?: number;

    wrapTitle?: boolean;
    showAuthor?: boolean;

    header?: ReactNode;
    emptyFallback?: ReactNode;

    ads?: boolean;
};

export type RotateTransitionProps = {
    duration?: number;
    children?: ReactNode;
};

export type StoryImagePreviewProps = {
    images: ImageType[];
    imageSize?: ImageSize;
    tapControl?: boolean;
    slideable?: boolean;
    onActiveIndexChange?: (index: number) => void;
    onClickLastItem?: () => void;
    onClickFirstItem?: () => void;
};
