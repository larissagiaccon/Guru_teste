import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { useUsers } from 'hooks/useUser';

import { Button } from 'components/Button';
import { Search } from 'components/Search';
import { Pagination } from 'components/Pagination';
import { ActivityIndicator } from 'components/ActivityIndicator';
import { SelectSizePagination } from 'components/SelectSizePagination';

import { UserItem } from 'organisms/Dashboard/UserItem';
import { UserItemSkeleton } from 'organisms/Dashboard/UserItemSkeleton';

import { Container, Content, Listing, FirstContent } from './styles';

type ItemProps = {
  value: string;
  label: string;
};

export function Dashboard() {
  const { push } = useHistory();

  const [pagination, setPagination] = useState({
    page: 1,
    search: '',
    resultsPerPage: {
      label: '10',
      value: '10',
    },
  });

  const { page, search, resultsPerPage } = pagination;

  const { data, isFetching, isFetched, isLoading } = useUsers(
    search,
    page,
    Number(resultsPerPage.value),
  );

  function handleSetSearch(term: string) {
    setPagination(prevState => {
      return { ...prevState, page: 1, search: term };
    });
  }

  function handleSetPage(newPage: number) {
    setPagination(prevState => {
      return { ...prevState, page: newPage };
    });
  }

  function handleSetItensPerPage(itensPerPage: ItemProps) {
    setPagination(prevState => {
      return { ...prevState, resultsPerPage: itensPerPage };
    });
  }

  const noUsersInList = isFetched && !data?.users?.length && !search;

  const noUsersInListSearched = isFetched && !data?.users?.length && search;

  useEffect(() => {
    if (data && data.users?.length === 0 && data.pageIndex > 1) {
      setPagination(prevState => {
        return { ...prevState, page: data.pageIndex - 1 };
      });
    }
  }, [data]);

  return (
    <Container data-testid="dashboardContainer">
      <Content hasData={!!data}>
        <div className="section-title">
          <h3>Usuários cadastrados</h3>

          <Button
            onClick={() => {
              push('/cadastro');
            }}
          >
            Novo usuário
          </Button>
        </div>

        <section>
          <div className="search-container">
            <Search
              setSearch={handleSetSearch}
              search={search}
              placeholder="Nome ou e-mail do usuário"
            />

            {isFetching && (
              <ActivityIndicator
                isLoading={isFetching}
                sizeActivity="large"
                color="blue"
                type="clip"
              />
            )}
          </div>

          <SelectSizePagination
            resultsPerPage={resultsPerPage}
            setResultsPerPage={handleSetItensPerPage}
          />
        </section>

        <Listing>
          {(!!data?.users?.length || isLoading) && (
            <div className="head">
              <span className="title">NOME</span>
              <span className="email">E-MAIL</span>
              <span className="actions">AÇÕES</span>
            </div>
          )}

          <div>
            {isLoading ? (
              <UserItemSkeleton />
            ) : (
              data?.users?.map(user => <UserItem key={user.id} user={user} />)
            )}

            <ReactTooltip effect="solid" />
          </div>
        </Listing>

        {!!data?.users?.length && (
          <Pagination
            onPageChange={handleSetPage}
            pageIndex={data?.pageIndex}
            totalPages={data?.totalPages}
            totalCount={data?.totalCount}
            resultsPerPage={data?.pageSize}
            hasPreviousPage={data?.hasPreviousPage}
            hasNextPage={data?.hasNextPage}
          />
        )}

        {noUsersInList && (
          <FirstContent>
            <Link
              to="/cadastro"
              data-testid="usersListEmptyListAndLinkCreateUserComponent"
            >
              Ops, ainda não tem nenhum usuário cadastrado, cadastrar um novo
              usuário?
            </Link>
          </FirstContent>
        )}

        {noUsersInListSearched && (
          <FirstContent>
            <Link
              to="/cadastro"
              data-testid="usersListNotFindAndLinkCreateUserComponent"
            >
              Ops, não encontramos nenhum usuário!
            </Link>
          </FirstContent>
        )}
      </Content>
    </Container>
  );
}
