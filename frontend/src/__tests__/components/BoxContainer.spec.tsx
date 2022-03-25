import { render, waitFor } from '@testing-library/react';

import { BoxContainer } from 'components/BoxContainer';

describe('Box Container Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render box container', async () => {
    const { getByTestId } = render(
      <BoxContainer>Test Box Container</BoxContainer>,
    );

    const boxContainerComponent = getByTestId('boxContainerComponent');

    await waitFor(() => {
      expect(boxContainerComponent).toBeInTheDocument();
      expect(boxContainerComponent).toHaveTextContent('Test Box Container');
    });
  });
});
