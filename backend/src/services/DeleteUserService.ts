import { inject, injectable } from 'tsyringe';

import User from '../entities/User';
import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.usersRepository.delete(user_id);

    return user;
  }
}

export default DeleteUserService;
