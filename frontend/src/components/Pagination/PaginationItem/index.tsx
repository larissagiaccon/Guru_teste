import React from 'react';

import { Container } from './styles';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
  dataTestId?: string;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  number,
  isCurrent,
  dataTestId,
  onPageChange,
}) => {
  if (isCurrent) {
    return (
      <Container data-testid={dataTestId}>
        <button
          type="button"
          disabled
          data-testid="paginationItemCurrentComponent"
        >
          {number}
        </button>
      </Container>
    );
  }

  return (
    <Container data-testid={dataTestId}>
      <button
        type="button"
        onClick={() => {
          onPageChange(number);
        }}
        data-testid="paginationItemNotCurrentComponent"
      >
        {number}
      </button>
    </Container>
  );
};
