# Guru Cadastro

![Guru_Dashboard](https://github.com/larissagiaccon/Guru_teste/blob/main/Dashboard.png)

![Guru_SignUp](https://github.com/larissagiaccon/Guru_teste/blob/main/SignUp.png)

![Guru_EditUser](https://github.com/larissagiaccon/Guru_teste/blob/main/EditUser.png)

## :computer: Sobre o Projeto

O projeto foi desenvolvido como teste para um processo seletivo e o objetivo foi criar uma aplicação que contém duas páginas, sendo elas página de listagem de usuários cadastrados, cadastro de usuário e atualização dos dados cadastrais de usuário.
Os requisitos do sistema desenvolvido são:

- O usuário poderá se cadastrar informando seu nome, e-mail, e senha.
- O usuário poderá listar os usuários cadastrados.
- O usuário poderá excluir usuários cadastrados.
- O usuário poderá alterar informações de um usuário específico.
- O sistema deverá validar os dados dos usuários utilizando a ferramenta Yup.

Para complementar o teste, foram implementados testes End-To-End cobrindo todos os componentes, pages e hooks criados no frontend e dos services do backend. A lib utilizada para implementação dos testes foi o [Jest](https://jestjs.io/).

## :rocket: Tecnologias

# Frontend
- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled-components](https://styled-components.com/)
- [Yup](https://github.com/jquense/yup)
- [Jest](https://jestjs.io/)
- [React-Query](https://react-query.tanstack.com/)
- [React-Select](https://react-select.com/home)
- [React-Spring](https://react-spring.io/)
- [React-Spinners](https://www.npmjs.com/package/react-spinners)
- [React-Tooltip](https://www.npmjs.com/package/react-tooltip)
- [Uuid](https://www.npmjs.com/package/uuid)
- [Yup](https://www.npmjs.com/package/yup)

# Backend
- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [BCryptjs](https://www.npmjs.com/package/bcryptjs)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- [Uuid](https://www.npmjs.com/package/uuid)

## :rocket: Como executar o projeto

# Frontend
```bash
# Clone este repositório
$ git clone https://github.com/larissagiaccon/Guru_teste.git

# Acesse a pasta do projeto no terminal/cmd
$ cd frontend

# Instale as dependências
$ npm install
# ou utilizando o yarn
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ npm start
# ou
$ yarn start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

# Backend
```bash
# Clone este repositório
$ git clone https://github.com/larissagiaccon/Guru_teste.git

# Acesse a pasta do projeto no terminal/cmd
$ cd backend

# Instale as dependências
$ npm install
# ou utilizando o yarn
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server
# ou
$ yarn dev:server

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```
