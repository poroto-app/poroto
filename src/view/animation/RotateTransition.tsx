import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const RotateTransition = styled.div`
    animation: ${rotate} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
`;
