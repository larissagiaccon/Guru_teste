import styled from 'styled-components';

export const Container = styled.div`
  padding: 2.4rem;

  background: var(--white);
  box-shadow: var(--shadow-small);
  border: 1px solid var(--white_gray);
  border-radius: var(--border-radius-medium);

  transition: 0.3s;

  height: min-content;
  width: 100%;

  &:hover {
    box-shadow: var(--shadow-medium);
  }

  .section-title {
    font-size: 2.4rem;
    color: var(--gray_300);
    font-weight: bold;
    margin-bottom: 3.6rem;
    padding-bottom: 2.4rem;

    border-bottom: 1px solid var(--gray_50);

    h3 {
      font-size: 2.4rem;
      color: var(--gray_300);
      font-weight: bold;
    }
  }

  @media (max-width: 1200px) {
    .section-title {
      margin-bottom: 2.4rem;
      padding-bottom: 1.5rem;
      font-size: 1rem;
    }
  }
`;
