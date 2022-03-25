import { render, waitFor } from '@testing-library/react';

import { Button } from 'components/Button';

describe('Button Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render button', async () => {
    const { getByTestId } = render(<Button>Test Button</Button>);

    const buttonComponent = getByTestId('buttonComponent');

    await waitFor(() => {
      expect(buttonComponent).toBeInTheDocument();
    });
  });

  it('should be able to render button if is fetching', async () => {
    const { getByTestId } = render(<Button isFetching>Test Button</Button>);

    const buttonComponent = getByTestId('buttonComponent');

    await waitFor(() => {
      expect(buttonComponent).not.toHaveTextContent('Test Button');
    });
  });
});
