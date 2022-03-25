import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useQueryClient } from 'react-query';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  UserData,
  createNewUser,
  getUserById,
  updateUser,
} from 'hooks/useUser';
import { useToast } from 'hooks/useToast';

import { formSignUp } from 'utils/formSignUp';
import getValidationErrorsYup from 'utils/getValidationErrorsYup';

import { Input } from 'components/Input';
import { Button } from 'components/Button';

import { Container, Content } from './styles';

export function SignUp() {
  const { replace } = useHistory();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<{ id: string }>();

  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState({} as UserData);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await getUserById(id);

          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [id]);

  const handleSubmit = useCallback(
    async (newData: UserData) => {
      try {
        setIsFetching(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape(formSignUp);

        await schema.validate(
          { ...newData, pageUpdate: !!id },
          {
            abortEarly: false,
          },
        );

        let response;

        if (id) {
          response = await updateUser({
            id,
            ...newData,
          });
        } else {
          response = await createNewUser(newData);
        }

        /* istanbul ignore else */
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Solicitação processada com sucesso.',
          });

          queryClient.invalidateQueries('users');

          replace('/');
        }
      } catch (err: any) {
        console.log(err);

        addToast({
          type: 'error',
          title: 'Erro',
          description:
            'Solicitação não foi processada. Aguarde um momento e tente novamente.',
        });

        if (err instanceof Yup.ValidationError) {
          const { validationErrors: errors } = getValidationErrorsYup(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.response.data.Error === 'This e-mail is already registered.') {
          formRef.current?.setFieldError('email', 'E-mail já cadastrado');
        }

        if (err.response.data.Error === 'Old password does not match.') {
          formRef.current?.setFieldError('old_password', 'Senha incorreta');
        }
      } finally {
        setIsFetching(false);
      }
    },
    [id, replace, addToast, queryClient],
  );

  return (
    <Container
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={{ ...user }}
      data-testid="signUpContainer"
    >
      <Content>
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <Input name="name" type="text" />
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <Input name="email" type="text" />
        </div>

        {id && (
          <div className="input-group">
            <label htmlFor="old_password">Senha Anterior</label>
            <Input name="old_password" type="password" />
          </div>
        )}

        <div className="input-group">
          <label htmlFor="password">{id ? 'Nova Senha' : 'Senha'}</label>
          <Input name="password" type="password" />
        </div>

        <Button type="submit" isFetching={isFetching}>
          Salvar
        </Button>

        <Link className="dashboard-link" to="/">
          Lista de usuários
          <FiArrowRight />
        </Link>
      </Content>
    </Container>
  );
}
