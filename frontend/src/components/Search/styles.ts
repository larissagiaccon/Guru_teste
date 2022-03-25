import styled from 'styled-components';

interface ContainerProps {
  itsFocused: boolean;
}

export const Container = styled.form<ContainerProps>`
  width: 100%;
  max-width: 40rem;
  padding: 1.2rem;
  border-radius: var(--border-radius-medium);
  background: var(--gray_50);
  box-shadow: ${props =>
    props.itsFocused ? 'var(--shadow-medium)' : 'var(--shadow-small)'};

  display: flex;
  align-items: center;

  transition: 0.3s;

  input {
    background: transparent;
    border: 0;

    width: 100%;
    height: 100%;
    flex: 1;
    color: var(--gray_400);
    font-size: 1.4rem;

    &::placeholder {
      color: var(--gray_150);
      font-size: 1.4rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  button {
    border: 0;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--gray_150);
    }
  }
`;
