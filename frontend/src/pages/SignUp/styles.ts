import styled from 'styled-components';
import { Form } from '@unform/web';

import { BoxContainer } from 'components/BoxContainer';

export const Container = styled(Form)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .dashboard-link {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-top: 3.6rem;
    text-decoration: none;

    display: flex;
    align-items: center;
    align-self: center;
    transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;

    &:hover {
      filter: brightness(0.7);
    }

    svg {
      margin-left: 0.8rem;
    }
  }
`;

export const Content = styled(BoxContainer)`
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 32rem;

  .input-group + .input-group {
    margin-top: 2.4rem;
  }

  label {
    font-size: 1.4rem;
    font-weight: 500;
    margin-left: 0.5rem;
  }

  input {
    margin-top: 0.4rem;
  }

  button {
    align-self: flex-end;
    margin-top: 2.4rem;
    width: max-content;
  }
`;
