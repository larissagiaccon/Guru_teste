import 'reflect-metadata';

import AppError from '../errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('name_user');
    expect(user.email).toBe('email_user@hotmail.com');
  });

  it('should not be able to create a new user with same email from another ', async () => {
    await createUser.execute({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'name_user',
        email: 'email_user@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
