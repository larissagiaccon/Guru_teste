import { render } from '@testing-library/react';

import { ActivityIndicator } from 'components/ActivityIndicator';

describe('Activity Indicator Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render activity indicator default type', async () => {
    render(<ActivityIndicator isLoading />);
  });

  it('should be able to render activity indicator type clip loader', async () => {
    render(<ActivityIndicator isLoading type="clip" sizeActivity="medium" />);
  });

  it('should be able to render activity indicator type pulse loader', async () => {
    render(<ActivityIndicator isLoading type="pulse" sizeActivity="large" />);
  });
});
