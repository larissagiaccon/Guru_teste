import styled, { css } from 'styled-components';

import { BoxContainer } from 'components/BoxContainer';

type ContentProps = {
  hasData: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--gray_300);
  margin: 5.6rem auto;
  max-width: 76.8rem;
`;

export const Content = styled(BoxContainer)<ContentProps>`
  z-index: 10;
  display: flex;
  flex-direction: column;
  color: var(--gray_300);

  ${props =>
    !props.hasData &&
    css`
      min-height: 50rem;
    `};

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      width: max-content;
    }
  }

  > section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-container {
      flex: 1;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: 2.4rem;

      > span {
        margin-left: 1.2rem;
      }
    }

    .filter-item {
      max-width: 10rem;
    }
  }
`;

export const Listing = styled.div`
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: var(--gray_150);
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.8rem;
    margin-top: 2.4rem;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;

      flex: 1;

      text-align: left;
      font-weight: bold;
      text-transform: uppercase;

      & + span {
        margin-left: 1.2rem;
      }
    }

    .actions {
      flex: 0.5;
    }
  }
`;

export const FirstContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  p {
    text-align: center;
    color: var(--gray_200);
    font-size: 1.4rem;
    padding: 1.2rem 2.4rem;
    border-radius: var(--border-radius-medium);
    box-shadow: var(--shadow-medium);
  }

  a {
    min-height: 4.8rem;
    background: var(--green_100);
    color: var(--gray_200);
    padding: 2.4rem;
    font-size: 1.4rem;
    text-align: center;
    border-radius: var(--border-radius-medium);
    box-shadow: var(--shadow-small);

    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
