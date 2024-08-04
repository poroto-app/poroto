import { FadeInFadeOutTransitionProps } from "src/types/props";
import styled, { keyframes } from "styled-components";

const fadeinFadeOut = keyframes`
  0% {
    opacity: .1;
  }

  to {
    opacity: 1;
  }
`;

const Transition = styled.div<{ duration: number }>`
    animation: ${fadeinFadeOut} ${({ duration }) => duration}ms
        cubic-bezier(0.25, 0.46, 0.45, 0.94) alternate-reverse infinite;
`;

export function FadeInFadeOutTransition({
    duration = 750,
    children,
}: FadeInFadeOutTransitionProps) {
    return <Transition duration={duration}>{children}</Transition>;
}
