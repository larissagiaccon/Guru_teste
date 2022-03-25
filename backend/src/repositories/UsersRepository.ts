import { getRepository, EntityRepository, Repository, Like } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import User from '../entities/User';
import IUsersRepository from './IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAllUsers(
    search: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<any> {
    let users: User[];

    const totalCount = await this.ormRepository.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = totalPages > pageIndex;
    const hasPreviousPage = pageIndex - 1 !== 0;

    if (search) {
      users = await this.ormRepository.find({
        where: [{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }],
        order: { name: 'ASC' },
        take: pageSize,
        skip: pageIndex * pageSize - pageSize,
      });
    } else {
      users = await this.ormRepository.find({
        order: { name: 'ASC' },
        take: pageSize,
        skip: pageIndex * pageSize - pageSize,
      });
    }

    const dataFormatter = {
      users: users?.map(user => {
        return {
          id: user.id,
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
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where({ id: user_id })
      .execute();
  }

  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default UsersRepository;
