import User from '../entities/User';
import IListUsersDTO from '../dtos/IListUsersDTO';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllUsers(
    search: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<IListUsersDTO>;
  save(user: User): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
