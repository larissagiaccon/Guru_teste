import { Router } from 'express';
import { container } from 'tsyringe';

import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';
import GetUserByIdService from '../services/GetUserByIdService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  try {
    const { search } = request.body;
    const { pageIndex, pageSize } = request.query;

    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute(
      search,
      Number(pageIndex),
      Number(pageSize),
    );

    return response.json(users);
  } catch (err: any) {
    return response.status(400).json({ Error: err.message });
  }
});

usersRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const getUser = container.resolve(GetUserByIdService);

    const user = await getUser.execute(id);

    delete user.password;

    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ Error: err.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ Error: err.message });
  }
});

usersRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, old_password, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id: id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ Error: err.message });
  }
});

usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    delete user.password;

    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ Error: err.message });
  }
});

export default usersRouter;
