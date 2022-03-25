import { render, waitFor } from '@testing-library/react';

import { messages } from '__tests__mocks/messages';

import { ToastContainer } from 'components/ToastContainer';

const mockedMessages = messages;

describe('Toast Container Component', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('should be able to render toast container component', async () => {
    const { getByTestId } = render(
      <ToastContainer messages={mockedMessages} />,
    );

    const toastContainerContainer = getByTestId('toastContainerContainer');

    await waitFor(() => {
      expect(toastContainerContainer).toBeInTheDocument();
    });
  });
});
