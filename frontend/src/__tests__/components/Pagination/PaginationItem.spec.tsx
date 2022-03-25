import { render, fireEvent, waitFor } from '@testing-library/react';

import { PaginationItem } from 'components/Pagination/PaginationItem';

const mockedOnPageChange = jest.fn();

describe('Pagination Item Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render paginationItem item if current', async () => {
    const { getByTestId, queryByTestId } = render(
      <PaginationItem
        onPageChange={mockedOnPageChange}
        number={20}
        isCurrent
      />,
    );
    const paginationItemCurrentComponent = getByTestId(
      'paginationItemCurrentComponent',
    );
    const paginationItemNotCurrentComponent = queryByTestId(
      'paginationItemNotCurrentComponent',
    );

    await waitFor(() => {
      expect(paginationItemCurrentComponent).toBeInTheDocument();
      expect(paginationItemNotCurrentComponent).not.toBeInTheDocument();
    });
  });

  it('should be able to render paginationItem item if not current', async () => {
    const { getByTestId, queryByTestId } = render(
      <PaginationItem onPageChange={mockedOnPageChange} number={20} />,
    );

    const paginationItemNotCurrentComponent = getByTestId(
      'paginationItemNotCurrentComponent',
    );
    const paginationItemCurrentComponent = queryByTestId(
      'paginationItemCurrentComponent',
    );

    fireEvent.click(paginationItemNotCurrentComponent);

    await waitFor(() => {
      expect(mockedOnPageChange).toHaveBeenCalled();
      expect(paginationItemNotCurrentComponent).toBeInTheDocument();
      expect(paginationItemCurrentComponent).not.toBeInTheDocument();
    });
  });
});
