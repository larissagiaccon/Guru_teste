import { inject, injectable } from 'tsyringe';

import User from '../entities/User';
import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default GetUserByIdService;
