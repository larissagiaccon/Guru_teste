import styled from 'styled-components';

export const Container = styled.div`
  border-radius: var(--border-radius-medium);
  border: 1px solid var(--gray_50);
  box-shadow: var(--shadow-small);
  background: var(--gray_50);
  width: 5.6rem;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;

  .css-2b097c-container {
    background: transparent;
    flex: 1;
    font-size: 1.2rem;
    height: 100%;
    display: flex;
    cursor: pointer;

    .react-select__control {
      flex: 1;
      cursor: pointer;
      background: transparent;
      border: 0 !important;
      min-height: 3.8rem !important;
    }

    .react-select__control--is-focused {
      border: 0 !important;
      box-shadow: 0 0 0 transparent;
      border-width: 0;
    }
    .react-select__indicator-separator {
      display: none;
    }

    .react-select__dropdown-indicator {
      display: none;
    }

    .react-select__control .react-select__value-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .react-select__control .react-select__single-value {
      /* width: 100%; */
      color: var(--gray_200);
      font-weight: 700;
    }

    .react-select__menu {
      margin-left: 0;
      cursor: pointer;
      overflow: hidden;

      .react-select__menu-list {
        padding: 0;
      }

      .react-select__option {
        text-align: center;
        cursor: pointer;
        color: var(--gray_200);
        font-weight: 700;
      }

      .react-select__option--is-focused {
        background: var(--gray_50);
      }
      .react-select__option--is-selected {
        color: var(--primary-color);
      }

      .react-select__option + .react-select__option {
        margin-left: 0;
      }
    }
  }
`;
