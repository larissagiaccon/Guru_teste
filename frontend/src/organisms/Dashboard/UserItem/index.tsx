import { useCallback, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';

import { useToast } from 'hooks/useToast';
import { deleteUser, UserData } from 'hooks/useUser';

import { ActivityIndicator } from 'components/ActivityIndicator';

import { Container } from './styles';

interface UserItemProps {
  user: UserData;
}

export function UserItem({ user }: UserItemProps) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [blocked, setBlocked] = useState(false);

  const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        setBlocked(true);

        const response = await deleteUser(id);

        /* istanbul ignore else */
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Solicitação processada com sucesso.',
          });

          queryClient.invalidateQueries('users');
        }
      } catch (err: any) {
        console.log(err);

        addToast({
          type: 'error',
          title: 'Erro',
          description:
            'Solicitação não foi processada. Aguarde um momento e tente novamente.',
        });
      } finally {
        setBlocked(false);
      }
    },
    [addToast, queryClient],
  );

  return (
    <BlockUi
      tag="div"
      blocking={blocked}
      keepInView
      loader={
        <ActivityIndicator
          isLoading
          sizeActivity="large"
          color="blue"
          type="pulse"
        />
      }
    >
      <Container data-testid="userItemContainer">
        <span className="name">
          <Link
            to={`/atualizar/${user.id}`}
            data-testid="userItemNameComponent"
          >
            {user.name}
          </Link>
        </span>
        <span className="email">
          <Link
            to={`/atualizar/${user.id}`}
            data-testid="userItemEmailComponent"
          >
            {user.email}
          </Link>
        </span>

        <div className="actions">
          <Link
            to={`/atualizar/${user.id}`}
            data-tip="Editar"
            data-place="bottom"
            data-testid="userItemLinkUpdateUserComponent"
          >
            <FiEdit />
          </Link>

          <button
            type="button"
            onClick={() => {
              handleDeleteUser(String(user.id));
            }}
            data-tip="Excluir"
            data-place="bottom"
            data-testid="userItemButtonDeleteUserComponent"
          >
            <FiTrash2 />
          </button>
        </div>
      </Container>
    </BlockUi>
  );
}
