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
