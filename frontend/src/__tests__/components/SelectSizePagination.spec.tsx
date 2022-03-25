import { render, fireEvent, waitFor } from '@testing-library/react';

import { SelectSizePagination } from 'components/SelectSizePagination';

const mockedResultsPerPage = {
  label: '10',
  value: '10',
};

const mockedSetResultsPerPage = jest.fn();

jest.mock('react-select', () => ({ options, onChange, selected }) => {
  function handleChange(event) {
    const option = options.find(
      opt => String(opt.value) === String(event.currentTarget.value),
    );

    onChange(option);
  }

  return (
    <select onChange={handleChange} data-testid="selectComponent">
      {options?.map(({ label, value }) => (
        <option
          key={value}
          value={value}
          selected={selected}
          data-testid="optionSelectComponent"
        >
          {label}
        </option>
      ))}
    </select>
  );
});

describe('Select Size Pagination', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('should be able to render select size pagination component', async () => {
    const { getByTestId } = render(
      <SelectSizePagination
        resultsPerPage={mockedResultsPerPage}
        setResultsPerPage={mockedSetResultsPerPage}
      />,
    );

    const selectSizePaginationContainer = getByTestId(
      'selectSizePaginationContainer',
    );

    await waitFor(() => {
      expect(selectSizePaginationContainer).toBeInTheDocument();
    });
  });

  it('should be able to render select size pagination component and user select item', async () => {
    const { getByTestId } = render(
      <SelectSizePagination
        resultsPerPage={mockedResultsPerPage}
        setResultsPerPage={mockedSetResultsPerPage}
      />,
    );

    const selectSizePaginationContainer = getByTestId(
      'selectSizePaginationContainer',
    );

    await waitFor(() => {
      expect(selectSizePaginationContainer).toBeInTheDocument();
    });

    const selectComponent = getByTestId('selectComponent');

    fireEvent.change(selectComponent, {
      target: { value: '20' },
    });

    await waitFor(() => {
      expect(mockedSetResultsPerPage).toHaveBeenCalledWith({
        label: '20',
        value: '20',
      });
    });
  });
});
