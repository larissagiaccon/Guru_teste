import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 3.6em;
  width: 100%;

  div.pagination-info {
    font-size: 1.4rem;
    color: var(--gray_200);
  }

  div.pagination-controllers {
    display: flex;
    align-items: center;
    justify-content: center;

    button.arrows {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      width: 2.5rem;

      background: transparent;

      svg {
        color: var(--gray_300);
      }

      &:disabled {
        cursor: default;

        svg {
          opacity: 0.2;
        }
      }
    }
  }
`;
