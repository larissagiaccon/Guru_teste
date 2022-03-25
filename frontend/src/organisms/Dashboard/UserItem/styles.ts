import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.2rem;
  width: 100%;
  padding: 1.2rem 0.8rem;
  color: var(--gray_300);
  border-radius: 1.2rem;

  transition: 0.3s ease-in-out;

  &:hover {
    box-shadow: var(--shadow-small);
  }

  & + & {
    border-top: 1px solid var(--gray_50);
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    flex: 1;

    & + span {
      margin-left: 1.2rem;
    }

    a {
      color: inherit;
      flex: 1;
      height: 100%;
    }
  }

  .actions {
    flex: 0.5;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.2rem;

    a,
    button {
      border: 0;
      background: transparent;

      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray_200);

      margin-left: 1.2rem;

      transition: 0.3s;

      &:hover {
        color: var(--gray_300);
      }

      svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
`;
