import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-small);

  background-image: linear-gradient(
    -90deg,
    #efedf1 0%,
    #f8f8f8 50%,
    #e7edf1 100%
  );
  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }

  &.white {
    background-image: linear-gradient(
      -90deg,
      #ffffff 0%,
      #e7edf1 50%,
      #ffffff 100%
    );
  }
`;
