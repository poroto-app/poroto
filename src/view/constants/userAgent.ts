import { isMobile, isTablet } from "react-device-detect";

export const isPC = !isMobile && !isTablet;
