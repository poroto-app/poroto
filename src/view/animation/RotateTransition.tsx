import { RotateTransitionProps } from "src/types/props";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Transition = styled.div<{ duration: number }>`
    animation: ${rotate} ${({ duration }) => duration}ms
        cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
`;

export function RotateTransition({
    duration = 1500,
    children,
}: RotateTransitionProps) {
    return <Transition duration={duration}>{children}</Transition>;
}
