import { container } from 'tsyringe';

import UsersRepository from '@repositoriesUsers/UsersRepository';
import IUsersRepository from '@repositoriesUsers/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
