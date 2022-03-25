import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 0.5rem;

  button {
    border: 0;
    width: 2.5rem;
    font-size: 1.4rem;
    background: transparent;

    color: var(--gray_200);

    &:disabled {
      color: var(--blue_500);
      font-weight: bold;
      font-size: 1.6rem;
    }

    &:hover {
      font-weight: bold;
    }
  }

  & + & {
    margin-left: 0;
  }
`;
