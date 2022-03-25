import { render, fireEvent, waitFor } from '@testing-library/react';

import { users } from '__tests__mocks/users';

import { SignUp } from 'pages/SignUp';

let mockedId = '';
const mockedUsers = users;

const mockedAddToast = jest.fn();
const mockedCreateUser = jest.fn();
const mockedUpdateUser = jest.fn();
const mockedGetUserById = jest.fn();
const mockedHistoryReplace = jest.fn();
const mockedInvalidateQueries = jest.fn();

jest.mock('react-query', () => {
  return {
    useQuery: jest.fn(),
    useQueryClient: () => ({
      invalidateQueries: mockedInvalidateQueries,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({
      id: mockedId,
    }),
    useHistory: () => ({
      replace: mockedHistoryReplace,
    }),
    Link: ({
      children,
      to,
      className,
      ...rest
    }: {
      children: React.ReactNode;
      to: string;
      className: string;
    }) => (
      <a href={to} className={className} {...rest}>
        {children}
      </a>
    ),
  };
});

jest.mock('hooks/useToast', () => {
  return {
    useToast: () => ({
      addToast: () => mockedAddToast(),
    }),
  };
});

jest.mock('hooks/useUser', () => {
  return {
    updateUser: () => mockedUpdateUser(),
    getUserById: () => mockedGetUserById(),
    createNewUser: () => mockedCreateUser(),
  };
});

describe('Sign Up Page', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();

    mockedCreateUser.mockReturnValue({
      status: 200,
    });
    mockedGetUserById.mockReturnValue({
      data: mockedUsers[0],
    });
    mockedUpdateUser.mockReturnValue({
      status: 200,
    });
  });

  it('should be able to render sign up page create', async () => {
    const { getByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
    });
  });

  it('should be able to render sign up page create and create with success', async () => {
    const { getByTestId, getAllByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
    });

    const inputComponent = getAllByTestId(
      'inputComponent',
    ) as HTMLInputElement[];

    const inputNameComponent = inputComponent[0];
    const inputEmailComponent = inputComponent[1];
    const inputPasswordComponent = inputComponent[2];

    fireEvent.change(inputNameComponent, {
      target: { value: mockedUsers[0].name },
    });
    fireEvent.change(inputEmailComponent, {
      target: { value: mockedUsers[0].email },
    });
    fireEvent.change(inputPasswordComponent, {
      target: { value: mockedUsers[0].password },
    });

    await waitFor(() => {
      const buttonComponent = getByTestId('buttonComponent');

      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(mockedCreateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).toHaveBeenCalled();
      expect(mockedHistoryReplace).toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page create and create with error', async () => {
    mockedCreateUser.mockRejectedValue({
      response: {
        data: {
          Error: 'This e-mail is already registered.',
        },
      },
    });

    const { getByTestId, getAllByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
    });

    const inputComponent = getAllByTestId(
      'inputComponent',
    ) as HTMLInputElement[];

    const inputNameComponent = inputComponent[0];
    const inputEmailComponent = inputComponent[1];
    const inputPasswordComponent = inputComponent[2];

    fireEvent.change(inputNameComponent, {
      target: { value: mockedUsers[0].name },
    });
    fireEvent.change(inputEmailComponent, {
      target: { value: mockedUsers[0].email },
    });
    fireEvent.change(inputPasswordComponent, {
      target: { value: mockedUsers[0].password },
    });

    await waitFor(() => {
      const buttonComponent = getByTestId('buttonComponent');

      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(mockedCreateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).not.toHaveBeenCalled();
      expect(mockedHistoryReplace).not.toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page create and create with validation error', async () => {
    const { getByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
    });

    await waitFor(() => {
      const buttonComponent = getByTestId('buttonComponent');

      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(mockedCreateUser).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).not.toHaveBeenCalled();
      expect(mockedHistoryReplace).not.toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page update', async () => {
    mockedId = mockedUsers[0].id;

    const { getByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
      expect(mockedGetUserById).toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page update and show correct user', async () => {
    mockedId = mockedUsers[0].id;

    const { getByTestId, getAllByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
      expect(mockedGetUserById).toHaveBeenCalled();
    });

    const inputComponent = getAllByTestId(
      'inputComponent',
    ) as HTMLInputElement[];

    const inputNameComponent = inputComponent[0];
    const inputEmailComponent = inputComponent[1];

    await waitFor(() => {
      expect(inputNameComponent.value).toBe(mockedUsers[0].name);
      expect(inputEmailComponent.value).toBe(mockedUsers[0].email);
    });
  });

  it('should be able to render sign up page update and update with success', async () => {
    mockedId = mockedUsers[0].id;

    const { getByTestId, getAllByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
      expect(mockedGetUserById).toHaveBeenCalled();
    });

    const inputComponent = getAllByTestId(
      'inputComponent',
    ) as HTMLInputElement[];

    const inputNameComponent = inputComponent[0];
    const inputEmailComponent = inputComponent[1];
    const inputPasswordComponent = inputComponent[2];
    const inputOldPasswordComponent = inputComponent[3];

    const newName = 'New Name';
    const newEmail = 'newemail@com.br';
    const password = '654321';

    fireEvent.change(inputNameComponent, {
      target: { value: newName },
    });
    fireEvent.change(inputEmailComponent, {
      target: { value: newEmail },
    });
    fireEvent.change(inputOldPasswordComponent, {
      target: { value: mockedUsers[0].password },
    });
    fireEvent.change(inputPasswordComponent, {
      target: { value: password },
    });

    await waitFor(() => {
      expect(inputNameComponent.value).toBe(newName);
      expect(inputEmailComponent.value).toBe(newEmail);
    });

    await waitFor(() => {
      const buttonComponent = getByTestId('buttonComponent');

      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(mockedUpdateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).toHaveBeenCalled();
      expect(mockedHistoryReplace).toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page update and update with error', async () => {
    mockedId = mockedUsers[0].id;

    mockedUpdateUser.mockRejectedValue({
      response: {
        data: {
          Error: 'Old password does not match.',
        },
      },
    });

    const { getByTestId, getAllByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
      expect(mockedGetUserById).toHaveBeenCalled();
    });

    const inputComponent = getAllByTestId(
      'inputComponent',
    ) as HTMLInputElement[];

    const inputNameComponent = inputComponent[0];
    const inputEmailComponent = inputComponent[1];
    const inputPasswordComponent = inputComponent[2];
    const inputOldPasswordComponent = inputComponent[3];

    const newName = 'New Name';
    const newEmail = 'newemail@com.br';
    const password = '654321';

    fireEvent.change(inputNameComponent, {
      target: { value: newName },
    });
    fireEvent.change(inputEmailComponent, {
      target: { value: newEmail },
    });
    fireEvent.change(inputOldPasswordComponent, {
      target: { value: '111111' },
    });
    fireEvent.change(inputPasswordComponent, {
      target: { value: password },
    });

    await waitFor(() => {
      expect(inputNameComponent.value).toBe(newName);
      expect(inputEmailComponent.value).toBe(newEmail);
    });

    await waitFor(() => {
      const buttonComponent = getByTestId('buttonComponent');

      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(mockedUpdateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).not.toHaveBeenCalled();
      expect(mockedHistoryReplace).not.toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page update and update with validation error', async () => {
    mockedId = mockedUsers[0].id;

    const { getByTestId, getAllByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
      expect(mockedGetUserById).toHaveBeenCalled();
    });

    const inputComponent = getAllByTestId(
      'inputComponent',
    ) as HTMLInputElement[];

    const inputNameComponent = inputComponent[0];
    const inputEmailComponent = inputComponent[1];
    const inputPasswordComponent = inputComponent[2];
    const inputOldPasswordComponent = inputComponent[3];

    fireEvent.change(inputNameComponent, {
      target: { value: '' },
    });
    fireEvent.change(inputEmailComponent, {
      target: { value: '' },
    });
    fireEvent.change(inputOldPasswordComponent, {
      target: { value: '' },
    });
    fireEvent.change(inputPasswordComponent, {
      target: { value: '' },
    });

    await waitFor(() => {
      const buttonComponent = getByTestId('buttonComponent');

      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(mockedUpdateUser).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).not.toHaveBeenCalled();
      expect(mockedHistoryReplace).not.toHaveBeenCalled();
    });
  });

  it('should be able to render sign up page update and get user by id with error', async () => {
    mockedId = mockedUsers[0].id;

    mockedGetUserById.mockRejectedValue({});

    const { getByTestId } = render(<SignUp />);

    const signUpContainer = getByTestId('signUpContainer');

    await waitFor(() => {
      expect(signUpContainer).toBeInTheDocument();
      expect(mockedGetUserById).toHaveBeenCalled();
    });
  });
});
