import { render, fireEvent, waitFor } from '@testing-library/react';

import { users } from '__tests__mocks/users';

import { UserItem } from 'organisms/Dashboard/UserItem';

const mockedItem = users[0];

const mockedAddToast = jest.fn();
const mockedDeleteUser = jest.fn();
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
    deleteUser: () => mockedDeleteUser(),
  };
});

describe('User Item Organisms', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();

    mockedDeleteUser.mockReturnValue({
      status: 200,
    });
  });

  it('should be able to render user item organisms', async () => {
    const { getByTestId } = render(<UserItem user={mockedItem} />);

    const userItemContainer = getByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer).toBeInTheDocument();
    });
  });

  it('should be able to render user item organisms and show correct infos', async () => {
    const { getByTestId } = render(<UserItem user={mockedItem} />);

    const userItemContainer = getByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer).toBeInTheDocument();
    });

    const userItemNameComponent = getByTestId('userItemNameComponent');
    const userItemEmailComponent = getByTestId('userItemEmailComponent');

    await waitFor(() => {
      expect(userItemNameComponent).toHaveTextContent(mockedItem.name);
      expect(userItemEmailComponent).toHaveTextContent(mockedItem.email);

      expect(userItemNameComponent).toHaveAttribute(
        'href',
        `/atualizar/${mockedItem.id}`,
      );
      expect(userItemEmailComponent).toHaveAttribute(
        'href',
        `/atualizar/${mockedItem.id}`,
      );
    });
  });

  it('should be able to render user item organisms and user click delete item with success', async () => {
    const { getByTestId } = render(<UserItem user={mockedItem} />);

    const userItemContainer = getByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer).toBeInTheDocument();
    });

    await waitFor(() => {
      const userItemButtonDeleteUserComponent = getByTestId(
        'userItemButtonDeleteUserComponent',
      );

      fireEvent.click(userItemButtonDeleteUserComponent);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).toHaveBeenCalled();
    });
  });

  it('should be able to render user item organisms and user click delete item with error', async () => {
    const { getByTestId } = render(<UserItem user={mockedItem} />);
    mockedDeleteUser.mockRejectedValue({});

    const userItemContainer = getByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer).toBeInTheDocument();
    });

    await waitFor(() => {
      const userItemButtonDeleteUserComponent = getByTestId(
        'userItemButtonDeleteUserComponent',
      );

      fireEvent.click(userItemButtonDeleteUserComponent);
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalled();
      expect(mockedInvalidateQueries).not.toHaveBeenCalled();
    });
  });
});
