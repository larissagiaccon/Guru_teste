/* eslint-disable no-param-reassign */
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue = '', error, registerField } = useField(name);
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    /* istanbul ignore else */
    if (defaultValue !== null) setValueInput(defaultValue);
  }, [defaultValue]);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current?.value;
      },
      setValue: (ref, value) => {
        /* istanbul ignore else */
        if (value) {
          setValueInput(value as string);

          ref.current.value = value;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className="input"
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="inputContainer"
    >
      <input
        value={valueInput}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={e => setValueInput(e.target.value)}
        ref={inputRef}
        {...rest}
        data-testid="inputComponent"
      />

      {error && (
        <em className="error" data-testid="inputErrorComponent">
          {error}
        </em>
      )}
    </Container>
  );
};
