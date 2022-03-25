import { ButtonHTMLAttributes } from 'react';

import { ActivityIndicator } from 'components/ActivityIndicator';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFetching?: boolean;
  colorLoader?: 'white' | 'blue' | 'gray';
}

export function Button({
  children,
  isFetching,
  colorLoader = 'white',
  ...rest
}: ButtonProps) {
  return (
    <Container
      type="button"
      disabled={isFetching}
      {...rest}
      data-testid="buttonComponent"
    >
      {isFetching ? (
        <ActivityIndicator
          type="pulse"
          isLoading
          sizeActivity="medium"
          color={colorLoader}
        />
      ) : (
        children
      )}
    </Container>
  );
}
