import { render, fireEvent, waitFor } from '@testing-library/react';

import { Pagination } from 'components/Pagination';

const mockedOnPageChange = jest.fn();

describe('Pagination Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render pagination if current is first page', async () => {
    const { getByTestId, queryByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={1}
        totalPages={20}
        totalCount={30}
        hasNextPage
        hasPreviousPage={false}
      />,
    );

    const paginationLeftArrowDisabledComponent = getByTestId(
      'paginationLeftArrowDisabledComponent',
    );
    const paginationLeftArrowComponent = queryByTestId(
      'paginationLeftArrowComponent',
    );
    const paginationFirstPageComponent = queryByTestId(
      'paginationFirstPageComponent',
    );
    const paginationThreePointsLeftComponent = queryByTestId(
      'paginationThreePointsLeftComponent',
    );
    const paginationAfterCurrentPageComponent = queryByTestId(
      'paginationAfterCurrentPageComponent',
    );
    const paginationCurrentPageComponent = getByTestId(
      'paginationCurrentPageComponent',
    );
    const paginationBeforeCurrentPageComponent = getByTestId(
      'paginationBeforeCurrentPageComponent',
    );
    const paginationThreePointsRightComponent = getByTestId(
      'paginationThreePointsRightComponent',
    );
    const paginationLastPageComponent = getByTestId(
      'paginationLastPageComponent',
    );
    const paginationRightArrowComponent = getByTestId(
      'paginationRightArrowComponent',
    );
    const paginationRightArrowDisabledComponent = queryByTestId(
      'paginationRightArrowDisabledComponent',
    );

    await waitFor(() => {
      expect(paginationLeftArrowDisabledComponent).toBeInTheDocument();
      expect(paginationLeftArrowComponent).not.toBeInTheDocument();
      expect(paginationFirstPageComponent).not.toBeInTheDocument();
      expect(paginationThreePointsLeftComponent).not.toBeInTheDocument();
      expect(paginationAfterCurrentPageComponent).not.toBeInTheDocument();
      expect(paginationCurrentPageComponent).toBeInTheDocument();
      expect(paginationBeforeCurrentPageComponent).toBeInTheDocument();
      expect(paginationThreePointsRightComponent).toBeInTheDocument();
      expect(paginationLastPageComponent).toBeInTheDocument();
      expect(paginationRightArrowComponent).toBeInTheDocument();
      expect(paginationRightArrowDisabledComponent).not.toBeInTheDocument();
    });
  });

  it('should be able to render pagination if current is second page', async () => {
    const { getByTestId, queryByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={2}
        totalPages={20}
        totalCount={30}
        hasNextPage
        hasPreviousPage
      />,
    );

    const paginationLeftArrowDisabledComponent = queryByTestId(
      'paginationLeftArrowDisabledComponent',
    );
    const paginationLeftArrowComponent = getByTestId(
      'paginationLeftArrowComponent',
    );
    const paginationFirstPageComponent = queryByTestId(
      'paginationFirstPageComponent',
    );
    const paginationThreePointsLeftComponent = queryByTestId(
      'paginationThreePointsLeftComponent',
    );
    const paginationAfterCurrentPageComponent = getByTestId(
      'paginationAfterCurrentPageComponent',
    );
    const paginationCurrentPageComponent = getByTestId(
      'paginationCurrentPageComponent',
    );
    const paginationBeforeCurrentPageComponent = getByTestId(
      'paginationBeforeCurrentPageComponent',
    );
    const paginationThreePointsRightComponent = getByTestId(
      'paginationThreePointsRightComponent',
    );
    const paginationLastPageComponent = getByTestId(
      'paginationLastPageComponent',
    );
    const paginationRightArrowComponent = getByTestId(
      'paginationRightArrowComponent',
    );
    const paginationRightArrowDisabledComponent = queryByTestId(
      'paginationRightArrowDisabledComponent',
    );

    await waitFor(() => {
      expect(paginationLeftArrowDisabledComponent).not.toBeInTheDocument();
      expect(paginationLeftArrowComponent).toBeInTheDocument();
      expect(paginationFirstPageComponent).not.toBeInTheDocument();
      expect(paginationThreePointsLeftComponent).not.toBeInTheDocument();
      expect(paginationAfterCurrentPageComponent).toBeInTheDocument();
      expect(paginationCurrentPageComponent).toBeInTheDocument();
      expect(paginationBeforeCurrentPageComponent).toBeInTheDocument();
      expect(paginationThreePointsRightComponent).toBeInTheDocument();
      expect(paginationLastPageComponent).toBeInTheDocument();
      expect(paginationRightArrowComponent).toBeInTheDocument();
      expect(paginationRightArrowDisabledComponent).not.toBeInTheDocument();
    });
  });

  it('should be able to render pagination if current is third page', async () => {
    const { getByTestId, queryByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={3}
        totalPages={20}
        totalCount={30}
        hasNextPage
        hasPreviousPage
      />,
    );

    const paginationLeftArrowDisabledComponent = queryByTestId(
      'paginationLeftArrowDisabledComponent',
    );
    const paginationLeftArrowComponent = getByTestId(
      'paginationLeftArrowComponent',
    );
    const paginationFirstPageComponent = getByTestId(
      'paginationFirstPageComponent',
    );
    const paginationThreePointsLeftComponent = queryByTestId(
      'paginationThreePointsLeftComponent',
    );
    const paginationAfterCurrentPageComponent = getByTestId(
      'paginationAfterCurrentPageComponent',
    );
    const paginationCurrentPageComponent = getByTestId(
      'paginationCurrentPageComponent',
    );
    const paginationBeforeCurrentPageComponent = getByTestId(
      'paginationBeforeCurrentPageComponent',
    );
    const paginationThreePointsRightComponent = getByTestId(
      'paginationThreePointsRightComponent',
    );
    const paginationLastPageComponent = getByTestId(
      'paginationLastPageComponent',
    );
    const paginationRightArrowComponent = getByTestId(
      'paginationRightArrowComponent',
    );
    const paginationRightArrowDisabledComponent = queryByTestId(
      'paginationRightArrowDisabledComponent',
    );

    await waitFor(() => {
      expect(paginationLeftArrowDisabledComponent).not.toBeInTheDocument();
      expect(paginationLeftArrowComponent).toBeInTheDocument();
      expect(paginationFirstPageComponent).toBeInTheDocument();
      expect(paginationThreePointsLeftComponent).not.toBeInTheDocument();
      expect(paginationAfterCurrentPageComponent).toBeInTheDocument();
      expect(paginationCurrentPageComponent).toBeInTheDocument();
      expect(paginationBeforeCurrentPageComponent).toBeInTheDocument();
      expect(paginationThreePointsRightComponent).toBeInTheDocument();
      expect(paginationLastPageComponent).toBeInTheDocument();
      expect(paginationRightArrowComponent).toBeInTheDocument();
      expect(paginationRightArrowDisabledComponent).not.toBeInTheDocument();
    });
  });

  it('should be able to render pagination if current is fourth page and so on', async () => {
    const { getByTestId, queryByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={4}
        totalPages={20}
        totalCount={30}
        hasNextPage
        hasPreviousPage
      />,
    );

    const paginationLeftArrowDisabledComponent = queryByTestId(
      'paginationLeftArrowDisabledComponent',
    );
    const paginationLeftArrowComponent = getByTestId(
      'paginationLeftArrowComponent',
    );
    const paginationFirstPageComponent = getByTestId(
      'paginationFirstPageComponent',
    );
    const paginationThreePointsLeftComponent = getByTestId(
      'paginationThreePointsLeftComponent',
    );
    const paginationAfterCurrentPageComponent = getByTestId(
      'paginationAfterCurrentPageComponent',
    );
    const paginationCurrentPageComponent = getByTestId(
      'paginationCurrentPageComponent',
    );
    const paginationBeforeCurrentPageComponent = getByTestId(
      'paginationBeforeCurrentPageComponent',
    );
    const paginationThreePointsRightComponent = getByTestId(
      'paginationThreePointsRightComponent',
    );
    const paginationLastPageComponent = getByTestId(
      'paginationLastPageComponent',
    );
    const paginationRightArrowComponent = getByTestId(
      'paginationRightArrowComponent',
    );
    const paginationRightArrowDisabledComponent = queryByTestId(
      'paginationRightArrowDisabledComponent',
    );

    await waitFor(() => {
      expect(paginationLeftArrowDisabledComponent).not.toBeInTheDocument();
      expect(paginationLeftArrowComponent).toBeInTheDocument();
      expect(paginationFirstPageComponent).toBeInTheDocument();
      expect(paginationThreePointsLeftComponent).toBeInTheDocument();
      expect(paginationAfterCurrentPageComponent).toBeInTheDocument();
      expect(paginationCurrentPageComponent).toBeInTheDocument();
      expect(paginationBeforeCurrentPageComponent).toBeInTheDocument();
      expect(paginationThreePointsRightComponent).toBeInTheDocument();
      expect(paginationLastPageComponent).toBeInTheDocument();
      expect(paginationRightArrowComponent).toBeInTheDocument();
      expect(paginationRightArrowDisabledComponent).not.toBeInTheDocument();
    });
  });

  it('should be able to render pagination if current is last page', async () => {
    const { getByTestId, queryByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={20}
        totalPages={20}
        totalCount={30}
        hasNextPage={false}
        hasPreviousPage
      />,
    );

    const paginationLeftArrowDisabledComponent = queryByTestId(
      'paginationLeftArrowDisabledComponent',
    );
    const paginationLeftArrowComponent = getByTestId(
      'paginationLeftArrowComponent',
    );
    const paginationFirstPageComponent = getByTestId(
      'paginationFirstPageComponent',
    );
    const paginationThreePointsLeftComponent = getByTestId(
      'paginationThreePointsLeftComponent',
    );
    const paginationAfterCurrentPageComponent = getByTestId(
      'paginationAfterCurrentPageComponent',
    );
    const paginationCurrentPageComponent = getByTestId(
      'paginationCurrentPageComponent',
    );
    const paginationBeforeCurrentPageComponent = queryByTestId(
      'paginationBeforeCurrentPageComponent',
    );
    const paginationThreePointsRightComponent = queryByTestId(
      'paginationThreePointsRightComponent',
    );
    const paginationLastPageComponent = queryByTestId(
      'paginationLastPageComponent',
    );
    const paginationRightArrowComponent = queryByTestId(
      'paginationRightArrowComponent',
    );
    const paginationRightArrowDisabledComponent = getByTestId(
      'paginationRightArrowDisabledComponent',
    );

    await waitFor(() => {
      expect(paginationLeftArrowDisabledComponent).not.toBeInTheDocument();
      expect(paginationLeftArrowComponent).toBeInTheDocument();
      expect(paginationFirstPageComponent).toBeInTheDocument();
      expect(paginationThreePointsLeftComponent).toBeInTheDocument();
      expect(paginationAfterCurrentPageComponent).toBeInTheDocument();
      expect(paginationCurrentPageComponent).toBeInTheDocument();
      expect(paginationBeforeCurrentPageComponent).not.toBeInTheDocument();
      expect(paginationThreePointsRightComponent).not.toBeInTheDocument();
      expect(paginationLastPageComponent).not.toBeInTheDocument();
      expect(paginationRightArrowComponent).not.toBeInTheDocument();
      expect(paginationRightArrowDisabledComponent).toBeInTheDocument();
    });
  });

  it('should be able to render pagination if current page and user click button pagination left', async () => {
    const { getByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={4}
        totalPages={20}
        totalCount={30}
        hasNextPage
        hasPreviousPage
      />,
    );

    const paginationLeftArrowComponent = getByTestId(
      'paginationLeftArrowComponent',
    );

    fireEvent.click(paginationLeftArrowComponent);

    await waitFor(() => {
      expect(mockedOnPageChange).toHaveBeenCalled();
    });
  });

  it('should be able to render pagination if current page and user click button pagination right', async () => {
    const { getByTestId } = render(
      <Pagination
        onPageChange={mockedOnPageChange}
        pageIndex={4}
        totalPages={20}
        totalCount={30}
        hasNextPage
        hasPreviousPage
      />,
    );

    const paginationRightArrowComponent = getByTestId(
      'paginationRightArrowComponent',
    );

    fireEvent.click(paginationRightArrowComponent);

    await waitFor(() => {
      expect(mockedOnPageChange).toHaveBeenCalled();
    });
  });
});
