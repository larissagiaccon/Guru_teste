import 'reflect-metadata';

import ListUsersService from './ListUsersService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let listUsers: ListUsersService;
let fakeUsersRepository: FakeUsersRepository;

describe('ListUsersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list the Users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Usuario 1',
      email: 'usuario1@hotmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Usuario 2',
      email: 'usuario2@hotmail.com',
      password: '123456',
    });

    const users = await listUsers.execute('', 1, 5);

    expect(users.users).toEqual([
      {
        name: 'Usuario 1',
        email: 'usuario1@hotmail.com',
      },
      {
        name: 'Usuario 2',
        email: 'usuario2@hotmail.com',
      },
    ]);
  });
});
