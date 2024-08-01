import styled, { keyframes } from "styled-components";

const fadeinFadeOut = keyframes`
  0% {
    opacity: .1;
  }

  to {
    opacity: 1;
  }
`;

export const FadeInFadeOutTransition = styled.div`
    animation: ${fadeinFadeOut} 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        alternate-reverse infinite;
`;
