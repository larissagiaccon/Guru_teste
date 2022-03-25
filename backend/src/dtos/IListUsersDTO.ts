import User from '@entitiesUsers/User';

export default interface IListUsersDTO {
  users: User[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
