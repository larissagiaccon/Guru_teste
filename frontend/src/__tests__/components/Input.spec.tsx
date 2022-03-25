import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { RefObject } from 'react';

import { Input } from 'components/Input';

const mockedHandleSubmit = jest.fn();

describe('Input Component', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  it('should be able to render input', async () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <Form onSubmit={mockedHandleSubmit} ref={formRef}>
        <Input name="inputField" />
      </Form>,
    );

    const inputContainer = getByTestId('inputContainer');

    await waitFor(() => {
      expect(inputContainer).toBeInTheDocument();
    });
  });

  it('should be able to render input and change value', async () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <Form onSubmit={mockedHandleSubmit} ref={formRef}>
        <Input name="inputField" />
      </Form>,
    );

    const inputContainer = getByTestId('inputContainer');

    await waitFor(() => {
      expect(inputContainer).toBeInTheDocument();
    });

    const inputComponent = getByTestId('inputComponent');

    fireEvent.change(inputComponent, {
      target: { value: 'Value test' },
    });

    await waitFor(() => {
      expect(inputComponent).toHaveValue('Value test');
    });
  });

  it('should be able to render input and change value by form', async () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <Form onSubmit={mockedHandleSubmit} ref={formRef}>
        <Input name="inputField" />
      </Form>,
    );

    const inputContainer = getByTestId('inputContainer');

    await waitFor(() => {
      expect(inputContainer).toBeInTheDocument();
    });

    const inputComponent = getByTestId('inputComponent');

    await waitFor(() => {
      if (formRef.current) {
        formRef.current.setFieldValue('inputField', 'Value test');
      }
    });

    await waitFor(() => {
      expect(inputComponent).toHaveValue('Value test');
    });
  });

  it('should be able to render input and show error', async () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <Form onSubmit={mockedHandleSubmit} ref={formRef}>
        <Input name="inputField" />
      </Form>,
    );

    const inputContainer = getByTestId('inputContainer');

    act(() => {
      if (formRef.current) {
        formRef.current.getFieldValue('inputField');
        formRef.current.setFieldError('inputField', 'Invalid field');
      }
    });

    const inputErrorComponent = getByTestId('inputErrorComponent');

    await waitFor(() => {
      expect(inputContainer).toBeInTheDocument();
      expect(inputErrorComponent).toBeInTheDocument();
    });
  });

  it('should be able to render input and focus and blur', async () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <Form onSubmit={mockedHandleSubmit} ref={formRef}>
        <Input name="inputField" />
      </Form>,
    );

    const inputContainer = getByTestId('inputContainer');

    await waitFor(() => {
      expect(inputContainer).toBeInTheDocument();
    });

    const inputComponent = getByTestId('inputComponent');

    fireEvent.focus(inputComponent);

    await waitFor(() => {
      expect(inputComponent).toHaveStyle('color: var(--gray_300;');
      expect(inputComponent).toHaveStyle('border-color: var(--gray_100);');
    });

    fireEvent.blur(inputComponent);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(inputComponent).toHaveStyle('border-color: var(--gray_50);');
    });
  });
});
