import { renderHook } from '@testing-library/react-hooks';

import { useToast, ToastProvider } from 'hooks/useToast';

import { messages } from '__tests__mocks/messages';

const mockedMessage = messages[0];

describe('useToast Hook', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('should be able to add toast', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.addToast(mockedMessage);

    const messagesArray = result.current.messages;

    expect(messagesArray[0].type).toBe(mockedMessage.type);
    expect(messagesArray[0].title).toBe(mockedMessage.title);
    expect(messagesArray[0].description).toBe(mockedMessage.description);
  });

  it('should be able to remove toast', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.addToast(mockedMessage);

    const messagesArray = result.current.messages;

    expect(messagesArray[0].type).toBe(mockedMessage.type);
    expect(messagesArray[0].title).toBe(mockedMessage.title);
    expect(messagesArray[0].description).toBe(mockedMessage.description);

    result.current.removeToast(messagesArray[0].id);

    expect(result.current.messages).toStrictEqual([]);
  });
});
