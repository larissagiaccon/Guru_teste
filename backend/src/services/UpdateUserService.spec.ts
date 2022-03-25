import 'reflect-metadata';

import AppError from '../errors/AppError';
import UpdateUserService from './UpdateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let updateProfile: UpdateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'name_user',
      email: 'email_user@hotmail.com',
      old_password: '123456',
      password: '456789',
    });

    expect(updateUser.name).toBe('name_user');
    expect(updateUser.email).toBe('email_user@hotmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'name_user',
        email: 'email_user@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update avatar with non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non_existing_user',
        name: 'name_user',
        email: 'email_user@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'name_user',
        email: 'email_user@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name_user',
      email: 'email_user@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'name_user',
        email: 'email_user@hotmail.com',
        old_password: 'wrong_old_password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
