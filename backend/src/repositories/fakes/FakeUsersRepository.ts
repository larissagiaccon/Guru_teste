import { v4 as uuid } from 'uuid';

import User from '../../entities/User';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllUsers(
    search: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<any> {
    let { users } = this;

    const totalCount = this.users.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = totalPages > pageIndex;
    const hasPreviousPage = pageIndex - 1 !== 0;

    if (search) {
      users = this.users.filter(
        user => user.name.includes(search) || user.email.includes(search),
      );
    } else {
      users = this.users.filter(user => user);
    }

    const dataFormatter = {
      users: users?.map(user => {
        return {
          name: user.name,
          email: user.email,
        };
      }),
      pageIndex,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };

    return dataFormatter;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== user_id);
  }

  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
