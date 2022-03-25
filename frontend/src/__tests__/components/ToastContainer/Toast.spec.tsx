/* eslint-disable prefer-destructuring */
import { fireEvent, render, waitFor } from '@testing-library/react';

import { messages } from '__tests__mocks/messages';

import { Toast } from 'components/ToastContainer/Toast';

let mockedMessage = messages[0];

const mockedRemoveToast = jest.fn();

jest.mock('hooks/useToast', () => {
  return {
    useToast: () => ({
      removeToast: () => mockedRemoveToast(),
    }),
  };
});

describe('Toast Component', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();

    mockedMessage = messages[0];
  });

  it('should be able to render toast component', async () => {
    const { getByTestId } = render(<Toast message={mockedMessage} />);

    const toastContainer = getByTestId('toastContainer');

    await waitFor(() => {
      expect(toastContainer).toBeInTheDocument();
    });
  });

  it('should be able to render toast component default type', async () => {
    mockedMessage = {
      id: '123',
      title: 'Test',
      description: 'Teste',
    };

    const { getByTestId } = render(<Toast message={mockedMessage} />);

    const toastContainer = getByTestId('toastContainer');

    await waitFor(() => {
      expect(toastContainer).toBeInTheDocument();
    });
  });

  it('should be able to render toast component and user click remove toast', async () => {
    const { getByTestId } = render(<Toast message={mockedMessage} />);

    const toastContainer = getByTestId('toastContainer');

    await waitFor(() => {
      expect(toastContainer).toBeInTheDocument();
    });

    const toastButtonRemoveToastComponent = getByTestId(
      'toastButtonRemoveToastComponent',
    );

    fireEvent.click(toastButtonRemoveToastComponent);

    await waitFor(() => {
      expect(mockedRemoveToast).toHaveBeenCalled();
    });
  });

  it('should be able to render toast component and timeout remove toast', async () => {
    const { getByTestId } = render(<Toast message={mockedMessage} />);

    const toastContainer = getByTestId('toastContainer');

    await waitFor(() => {
      expect(toastContainer).toBeInTheDocument();
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockedRemoveToast).toHaveBeenCalled();
    });
  });
});
