import Select from 'react-select';

import { Container } from './styles';

type ItemProps = {
  value: string;
  label: string;
};

interface Props {
  resultsPerPage: ItemProps;
  setResultsPerPage(newValue: ItemProps | null): void;
}

const options = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '20',
    value: '20',
  },
  {
    label: '30',
    value: '30',
  },
];

export function SelectSizePagination({
  resultsPerPage,
  setResultsPerPage,
}: Props) {
  return (
    <Container data-testid="selectSizePaginationContainer">
      <Select
        value={resultsPerPage}
        classNamePrefix="react-select"
        options={options}
        isSearchable={false}
        onChange={setResultsPerPage}
      />
    </Container>
  );
}
