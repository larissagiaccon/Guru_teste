import { render, waitFor } from '@testing-library/react';

import { UserItemSkeleton } from 'organisms/Dashboard/UserItemSkeleton';

describe('User Item Skeleton Organisms', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('should be able to render user item skeleton organisms', async () => {
    const { getAllByTestId } = render(<UserItemSkeleton />);

    const skeletonContainer = getAllByTestId('skeletonContainer');
    const skeletonComponent = getAllByTestId('skeletonComponent');

    await waitFor(() => {
      expect(skeletonContainer.length).toBe(10);
      expect(skeletonComponent.length).toBe(30);
    });
  });
});
