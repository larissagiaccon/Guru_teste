import { inject, injectable } from 'tsyringe';

import IListUsersDTO from '../dtos/IListUsersDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    search: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<IListUsersDTO> {
    const users = await this.usersRepository.findAllUsers(
      search,
      pageIndex,
      pageSize,
    );

    return users;
  }
}

export default ListUsersService;
