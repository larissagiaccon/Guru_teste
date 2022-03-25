import { FormEvent, InputHTMLAttributes, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  setSearch: (term: string) => void;
  placeholder: string;
  search: string;
}

export function Search({ setSearch, search, ...rest }: SearchProps) {
  const [term, setTerm] = useState('');
  const [itsFocused, setItsFocused] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!term && !search) return;
    setSearch(term);
  }

  function handleFocus() {
    setItsFocused(true);
  }

  function handleBlur() {
    setItsFocused(false);
  }
  return (
    <Container
      onSubmit={handleSubmit}
      itsFocused={itsFocused}
      data-testid="searchContainer"
    >
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        data-testid="searchComponent"
        {...rest}
      />
      <button type="submit">
        <FiSearch />
      </button>
    </Container>
  );
}
