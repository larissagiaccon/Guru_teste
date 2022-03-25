import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  flex-direction: column;

  ${props =>
    props.isFocused
      ? css`
          color: var(--gray_300);
          border-color: var(--gray_100);
        `
      : css`
          color: var(--white_gray);
        `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--white_gray);
    `}

  input {
    flex-wrap: wrap;
    width: 100%;
    height: 4rem;
    padding: 0 1.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    background: var(--background-secondary);
    color: var(--gray_200);
    text-align: left;
    border-radius: var(--border-radius-medium);
    border: 1px solid var(--gray_50);

    ${props =>
      props.isErrored &&
      css`
        border-color: var(--red_200);
      `}
  }
`;
