import { render, fireEvent, waitFor } from '@testing-library/react';

import { GetUsersProps } from 'hooks/useUser';

import { users } from '__tests__mocks/users';

import { Dashboard } from 'pages/Dashboard';

const mockedUsers = users;
let mockedIsFetched = false;
let mockedIsLoading = false;
let mockedIsFetching = false;
let mockedItems = {} as GetUsersProps;

const mockedUseUser = jest.fn();
const mockedAddToast = jest.fn();
const mockedDeleteUser = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedInvalidateQueries = jest.fn();

jest.mock('react-query', () => {
  return {
    useQuery: jest.fn(),
    useQueryClient: () => ({
      invalidateQueries: mockedInvalidateQueries,
    }),
  };
});

jest.mock('react-select', () => ({ options, onChange, selected }) => {
  function handleChange(event) {
    const option = options.find(
      opt => String(opt.value) === String(event.currentTarget.value),
    );

    onChange(option);
  }

  return (
    <select onChange={handleChange} data-testid="selectComponent">
      {options.map(({ label, value }) => (
        <option
          key={value}
          value={value}
          selected={selected}
          data-testid="optionSelectComponent"
        >
          {label}
        </option>
      ))}
    </select>
  );
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
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
    useUsers: () => mockedUseUser(),
    deleteUser: () => mockedDeleteUser(),
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();

    mockedIsFetched = false;
    mockedIsLoading = false;
    mockedIsFetching = false;

    mockedItems = {
      users: mockedUsers.slice(0, 10),
      pageIndex: 1,
      pageSize: 10,
      totalCount: mockedUsers.slice(0, 10).length,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    };

    mockedUseUser.mockReturnValue({
      data: mockedItems,
      isFetching: mockedIsFetching,
      isFetched: mockedIsFetched,
      isLoading: mockedIsLoading,
    });
    mockedDeleteUser.mockReturnValue({
      status: 200,
    });
  });

  it('should be able to render dashboard page', async () => {
    const { getByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });
  });

  it('should be able to render dashboard page empty items', async () => {
    mockedIsLoading = true;
    mockedIsFetched = true;

    mockedUseUser.mockReturnValue({
      data: {
        users: [],
        pageIndex: 0,
        pageSize: 10,
        totalCount: [],
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      isFetching: mockedIsFetching,
      isFetched: mockedIsFetched,
      isLoading: mockedIsLoading,
    });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');
    const skeletonContainer = getAllByTestId('skeletonContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
      expect(skeletonContainer.length).toBe(10);
    });

    await waitFor(() => {
      const usersListEmptyListAndLinkCreateUserComponent = getByTestId(
        'usersListEmptyListAndLinkCreateUserComponent',
      );

      expect(usersListEmptyListAndLinkCreateUserComponent).toBeInTheDocument();
      expect(usersListEmptyListAndLinkCreateUserComponent).toHaveAttribute(
        'href',
        '/cadastro',
      );
    });
  });

  it('should be able to render dashboard page with items', async () => {
    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    const userItemContainer = getAllByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer.length).toBe(mockedItems.users.length);
    });
  });

  it('should be able to render dashboard page with items and user search item exists', async () => {
    mockedUseUser
      .mockReturnValue({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: {
          users: [users[0]],
          pageIndex: 1,
          pageSize: 10,
          totalCount: [users[0]].length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    const userItemContainer = getAllByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer.length).toBe(mockedItems.users.length);
    });

    const searchContainer = getByTestId('searchContainer');
    const searchComponent = getByTestId('searchComponent');

    fireEvent.change(searchComponent, {
      target: { value: mockedItems.users[0].name },
    });

    fireEvent.submit(searchContainer);

    await waitFor(() => {
      const userItemContainerOne = getAllByTestId('userItemContainer');

      expect(userItemContainerOne.length).toBe(1);
    });
  });

  it('should be able to render dashboard page with items and user search item not exists', async () => {
    mockedIsFetched = true;

    mockedUseUser
      .mockReturnValue({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: {
          users: [],
          pageIndex: 1,
          pageSize: 10,
          totalCount: [].length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    const userItemContainer = getAllByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer.length).toBe(mockedItems.users.length);
    });

    const searchContainer = getByTestId('searchContainer');
    const searchComponent = getByTestId('searchComponent');

    fireEvent.change(searchComponent, {
      target: { value: 'Not exists item' },
    });

    fireEvent.submit(searchContainer);

    await waitFor(() => {
      const usersListNotFindAndLinkCreateUserComponent = getByTestId(
        'usersListNotFindAndLinkCreateUserComponent',
      );

      expect(usersListNotFindAndLinkCreateUserComponent).toBeInTheDocument();
      expect(usersListNotFindAndLinkCreateUserComponent).toHaveAttribute(
        'href',
        '/cadastro',
      );
    });
  });

  it('should be able to render dashboard page with items and user change results per page', async () => {
    mockedUseUser
      .mockReturnValue({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: {
          users: mockedUsers,
          pageIndex: 1,
          pageSize: 10,
          totalCount: mockedUsers.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    const userItemContainer = getAllByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer.length).toBe(mockedItems.users.length);
    });

    const selectComponent = getByTestId('selectComponent') as HTMLSelectElement;
    const optionSelectComponent = getAllByTestId(
      'optionSelectComponent',
    ) as HTMLOptionElement[];

    await waitFor(() => {
      expect(optionSelectComponent[0].selected).toBeTruthy();
      expect(optionSelectComponent[1].selected).toBeFalsy();
      expect(optionSelectComponent[2].selected).toBeFalsy();
    });

    fireEvent.change(selectComponent, {
      target: { value: '20' },
    });

    await waitFor(() => {
      expect(optionSelectComponent[0].selected).toBeFalsy();
      expect(optionSelectComponent[1].selected).toBeTruthy();
      expect(optionSelectComponent[2].selected).toBeFalsy();

      const usersContainer20Results = getAllByTestId('userItemContainer');

      expect(usersContainer20Results.length).toBe(mockedUsers.length);
    });
  });

  it('should be able to render dashboard page with items and user click second page', async () => {
    mockedIsFetching = true;

    mockedUseUser
      .mockReturnValue({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: {
          users: mockedUsers.slice(10, 20),
          pageIndex: 2,
          pageSize: 10,
          totalCount: mockedUsers.slice(10, 20).length,
          totalPages: 2,
          hasNextPage: false,
          hasPreviousPage: true,
        },
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    const userItemContainer = getAllByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemContainer.length).toBe(mockedItems.users.length);
    });

    const paginationRightArrowComponent = getByTestId(
      'paginationRightArrowComponent',
    );

    fireEvent.click(paginationRightArrowComponent);

    const userItemResultsContainer = getAllByTestId('userItemContainer');

    await waitFor(() => {
      expect(userItemResultsContainer.length).toBe(
        mockedUsers.slice(10, 20).length,
      );

      expect(userItemResultsContainer[0]).toHaveTextContent(
        mockedUsers[10].name,
      );
    });
  });

  it('should be able to render dashboard page with items and users if empty index', async () => {
    mockedItems = {
      users: [],
      pageIndex: 3,
      pageSize: 10,
      totalCount: 0,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    };

    mockedUseUser
      .mockReturnValue({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      })
      .mockReturnValueOnce({
        data: mockedItems,
        isFetching: mockedIsFetching,
        isFetched: mockedIsFetched,
        isLoading: mockedIsLoading,
      });

    const { getByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockedUseUser).toHaveBeenCalled();
    });
  });

  it('should be able to render dashboard page and user click create new user', async () => {
    const { getByTestId } = render(<Dashboard />);

    const dashboardContainer = getByTestId('dashboardContainer');

    await waitFor(() => {
      expect(dashboardContainer).toBeInTheDocument();
    });

    const buttonComponent = getByTestId('buttonComponent');

    fireEvent.click(buttonComponent);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalled();
    });
  });
});
