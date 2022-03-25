import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';
import AppProvider from './hooks';

const queryCliente = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <div className="background-1" />
      <div className="background-2" />

      <QueryClientProvider client={queryCliente}>
        <AppProvider>
          <Routes />
        </AppProvider>

        <GlobalStyle />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
