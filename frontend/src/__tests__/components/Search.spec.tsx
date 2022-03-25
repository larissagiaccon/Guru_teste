import { render, fireEvent, waitFor } from '@testing-library/react';

import { Search } from 'components/Search';

const mockedSetSearch = jest.fn();

describe('Search Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render search', async () => {
    const { getByTestId } = render(
      <Search setSearch={mockedSetSearch} search="" placeholder="Test" />,
    );

    const searchComponent = getByTestId('searchComponent');

    await waitFor(() => {
      expect(searchComponent).toBeInTheDocument();
    });
  });

  it('should be able to render search and submit form', async () => {
    const { getByTestId } = render(
      <Search setSearch={mockedSetSearch} search="Test" placeholder="Test" />,
    );

    const searchContainer = getByTestId('searchContainer');

    fireEvent.submit(searchContainer);

    await waitFor(() => {
      expect(mockedSetSearch).toHaveBeenCalled();
    });
  });

  it('should be able to render search and change input', async () => {
    const { getByTestId } = render(
      <Search setSearch={mockedSetSearch} search="Test" placeholder="Test" />,
    );

    const searchComponent = getByTestId('searchComponent');

    fireEvent.change(searchComponent, { target: { value: 'Test 2' } });

    await waitFor(() => {
      expect(searchComponent).toHaveValue('Test 2');
    });
  });

  it('should be able to render search and input focus', async () => {
    const { getByTestId } = render(
      <Search setSearch={mockedSetSearch} search="Test" placeholder="Test" />,
    );

    const searchContainer = getByTestId('searchContainer');
    const searchComponent = getByTestId('searchComponent');

    fireEvent.focus(searchComponent);

    await waitFor(() => {
      expect(searchContainer).toHaveStyle('box-shadow: var(--shadow-medium);');
    });
  });

  it('should be able to render search and input blur', async () => {
    const { getByTestId } = render(
      <Search setSearch={mockedSetSearch} search="Test" placeholder="Test" />,
    );

    const searchContainer = getByTestId('searchContainer');
    const searchComponent = getByTestId('searchComponent');

    fireEvent.blur(searchComponent);

    await waitFor(() => {
      expect(searchContainer).toHaveStyle('box-shadow: var(--shadow-small);');
    });
  });

  it('should be able to render search if empty search', async () => {
    const { getByTestId } = render(
      <Search setSearch={mockedSetSearch} search="" placeholder="Test" />,
    );

    const searchContainer = getByTestId('searchContainer');

    fireEvent.submit(searchContainer);

    await waitFor(() => {
      expect(mockedSetSearch).not.toHaveBeenCalled();
    });
  });
});
