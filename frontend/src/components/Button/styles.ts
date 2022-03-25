import styled from 'styled-components';

export const Container = styled.button`
  height: max-content;
  min-height: 4.2rem;
  width: 100%;
  padding: 0.8rem 2.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  border: 0;
  background: var(--purple);
  border-radius: var(--border-radius-medium);
  color: #fff;

  transition: 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
    box-shadow: var(--shadow-medium);
  }

  &:disabled {
    background: var(--gray_150) !important;
    cursor: not-allowed;

    &:hover {
      filter: brightness(1);
      box-shadow: var(--shadow-small);
    }
  }
`;
