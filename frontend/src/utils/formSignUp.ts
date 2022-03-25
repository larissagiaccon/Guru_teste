import * as Yup from 'yup';

export const formSignUp = {
  pageUpdate: Yup.boolean().nullable(),

  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().when('pageUpdate', {
    is: true,
    then: Yup.string().nullable(),
    otherwise: Yup.string().required('Campo obrigatório'),
  }),

  old_password: Yup.string().when(['pageUpdate', 'password'], {
    is: (pageUpdate: boolean, password: string) =>
      pageUpdate && password !== '',
    then: Yup.string().required('Campo obrigatório'),
    otherwise: Yup.string().nullable(),
  }),
};
