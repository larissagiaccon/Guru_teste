import { useQuery } from 'react-query';

import api from 'services/api';

export type UserData = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type GetUsersProps = {
  users: UserData[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function createNewUser(data: UserData) {
  const response = await api.post('/users', data);

  return response;
}

export async function updateUser(data: UserData) {
  const response = await api.put(`/users/${data.id}`, data);

  return response;
}

export async function deleteUser(id: string) {
  const response = await api.delete(`/users/${id}`);

  return response;
}

export async function getUserById(id: string) {
  const response = await api.get(`/users/${id}`);

  return response;
}

async function getUsers(search: string, pageIndex: number, pageSize: number) {
  const { data } = await api.get<GetUsersProps>('/users', {
    params: {
      search,
      pageIndex,
      pageSize,
    },
  });

  return data;
}

export function useUsers(search: string, pageIndex: number, pageSize: number) {
  return useQuery(
    ['users', search, pageIndex, pageSize],
    () => getUsers(search, pageIndex, pageSize),
    {
      staleTime: 1000 * 60 * 5, // 5 min
    },
  );
}
