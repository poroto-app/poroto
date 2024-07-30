import { ReactNode } from "react";

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
    onClick?: () => void;
};
