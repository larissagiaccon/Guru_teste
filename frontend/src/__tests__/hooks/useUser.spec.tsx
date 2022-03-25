import { QueryClientProvider, QueryClient } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from 'services/api';

import {
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
  useUsers,
} from 'hooks/useUser';

import { users } from '__tests__mocks/users';

const mockedApi = new MockAdapter(api);
const queryCliente = new QueryClient();

const mockedUsers = users;
const mockedUser = users[0];

describe('useUser Hook', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();

    mockedApi.reset();
  });

  it('should be able to create user', async () => {
    mockedApi.onPost('/users').reply(200);

    const { result, waitFor } = renderHook(() => createNewUser(mockedUser));

    const response = await result.current;

    await waitFor(() => {
      expect(response.status).toBe(200);
    });
  });

  it('should be able to update user', async () => {
    mockedApi.onPut(`/users/${mockedUser.id}`).reply(200);

    const { result, waitFor } = renderHook(() => updateUser(mockedUser));

    const response = await result.current;

    await waitFor(() => {
      expect(response.status).toBe(200);
    });
  });

  it('should be able to delete user', async () => {
    mockedApi.onDelete(`/users/${mockedUser.id}`).reply(200);

    const { result, waitFor } = renderHook(() => deleteUser(mockedUser.id));

    const response = await result.current;

    await waitFor(() => {
      expect(response.status).toBe(200);
    });
  });

  it('should be able to get user by id', async () => {
    mockedApi.onGet(`/users/${mockedUser.id}`).reply(200, mockedUser);

    const { result, waitFor } = renderHook(() => getUserById(mockedUser.id));

    const response = await result.current;

    await waitFor(() => {
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockedUser);
    });
  });

  it('should be able to get users', async () => {
    mockedApi.onGet('/users').reply(200, {
      users: mockedUsers,
    });

    const { result, waitFor } = renderHook(() => useUsers('', 1, 10), {
      wrapper: QueryClientProvider,
      initialProps: {
        client: queryCliente,
      },
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    await waitFor(() => {
      expect(result.current.data?.users).toEqual(mockedUsers);
    });
  });
});
