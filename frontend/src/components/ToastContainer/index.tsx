import React from 'react';
import { Transition } from 'react-spring';

import { ToastMessage } from 'hooks/useToast';

import { Toast } from './Toast';

import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

export function ToastContainer({ messages }: ToastContainerProps) {
  return (
    <Container data-testid="toastContainerContainer">
      <Transition
        items={messages}
        from={{ right: '-120%', opacity: 0 }}
        enter={{ right: '0%', opacity: 1 }}
        leave={{ right: '-120%', opacity: 1 }}
      >
        {(styles, item) => (
          <Toast key={item.id} style={styles} message={item} />
        )}
      </Transition>
    </Container>
  );
}
