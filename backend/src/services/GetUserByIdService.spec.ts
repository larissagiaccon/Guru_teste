import 'reflect-metadata';

import AppError from '../errors/AppError';
import GetUserByIdService from './GetUserByIdService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let getUserById: GetUserByIdService;

describe('GetUserByIdService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    getUserById = new GetUserByIdService(fakeUsersRepository);
  });

  it('should be able get user by id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    const user_confirm = await getUserById.execute(user.id);

    expect(user_confirm.name).toBe('name_user');
    expect(user_confirm.email).toBe('email_user@hotmail.com');
  });

  it('should not be able get user by id if a non-existing user', async () => {
    await expect(
      getUserById.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
