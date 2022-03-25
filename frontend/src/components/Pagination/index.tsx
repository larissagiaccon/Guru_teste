import React, { useMemo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { PaginationItem } from './PaginationItem';

import { Container } from './styles';

interface PaginationProps {
  onPageChange: (page: number) => void;
  resultsPerPage?: number;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export function Pagination({
  onPageChange,
  pageIndex,
  totalPages,
  hasPreviousPage,
  totalCount,
  resultsPerPage = 10,
  hasNextPage,
}: PaginationProps) {
  const previousPages =
    pageIndex > 1
      ? generatePagesArray(pageIndex - 1 - siblingsCount, pageIndex - 1)
      : [];

  const nextPages =
    pageIndex < totalPages
      ? generatePagesArray(
          pageIndex,
          Math.min(pageIndex + siblingsCount, totalPages),
        )
      : [];

  const visualizationPagesStart = useMemo(() => {
    return resultsPerPage * (pageIndex - 1) + 1;
  }, [pageIndex, resultsPerPage]);

  const visualizationPagesEnd = useMemo(() => {
    /* istanbul ignore next */
    if (totalCount <= resultsPerPage) return totalCount;
    return resultsPerPage * (pageIndex - 1) + resultsPerPage;
  }, [resultsPerPage, pageIndex, totalCount]);

  return (
    <Container>
      <div className="pagination-info">
        <strong>{visualizationPagesStart}</strong> -{' '}
        <strong>{visualizationPagesEnd}</strong> de{' '}
        <strong>{totalCount}</strong>
      </div>

      <div className="pagination-controllers">
        {hasPreviousPage ? (
          <button
            type="button"
            onClick={() => onPageChange(pageIndex - 1)}
            data-testid="paginationLeftArrowComponent"
            className="arrows"
          >
            <FiChevronLeft />
          </button>
        ) : (
          <button
            type="button"
            disabled
            data-testid="paginationLeftArrowDisabledComponent"
            className="arrows"
          >
            <FiChevronLeft />
          </button>
        )}

        {pageIndex > 1 + siblingsCount && (
          <>
            <PaginationItem
              onPageChange={onPageChange}
              number={1}
              dataTestId="paginationFirstPageComponent"
            />
            {pageIndex > 2 + siblingsCount && (
              <p data-testid="paginationThreePointsLeftComponent">...</p>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => {
            return (
              <PaginationItem
                key={page}
                onPageChange={onPageChange}
                number={page}
                dataTestId="paginationAfterCurrentPageComponent"
              />
            );
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={pageIndex}
          isCurrent
          dataTestId="paginationCurrentPageComponent"
        />

        {nextPages.length > 0 &&
          nextPages.map(page => {
            return (
              <PaginationItem
                key={page}
                onPageChange={onPageChange}
                number={page}
                dataTestId="paginationBeforeCurrentPageComponent"
              />
            );
          })}

        {pageIndex + siblingsCount < totalPages && (
          <>
            {pageIndex + 1 + siblingsCount < totalPages && (
              <p data-testid="paginationThreePointsRightComponent">...</p>
            )}
            <PaginationItem
              onPageChange={onPageChange}
              number={totalPages}
              dataTestId="paginationLastPageComponent"
            />
          </>
        )}

        {hasNextPage ? (
          <button
            type="button"
            onClick={() => onPageChange(pageIndex + 1)}
            data-testid="paginationRightArrowComponent"
            className="arrows"
          >
            <FiChevronRight />
          </button>
        ) : (
          <button
            type="button"
            disabled
            data-testid="paginationRightArrowDisabledComponent"
            className="arrows"
          >
            <FiChevronRight />
          </button>
        )}
      </div>

      <div className="empty-div" />
    </Container>
  );
}
