import { ReactNode } from 'react';

import { Container } from './styles';

interface BoxContainerProps {
  children: ReactNode;
}

export function BoxContainer({ children, ...rest }: BoxContainerProps) {
  return (
    <Container
      className="box-container"
      data-testid="boxContainerComponent"
      {...rest}
    >
      {children}
    </Container>
  );
}
