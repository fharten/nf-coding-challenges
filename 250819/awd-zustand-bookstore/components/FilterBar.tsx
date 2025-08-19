import { useRef } from 'react';
import { useSearchStore } from '../store/useAppStore';

function FilterBar() {
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) setSearchTerm(inputRef.current.value);
  };

  console.log('FilterBar rendered');

  return (
    <div style={{ marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search books...' ref={inputRef} />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default FilterBar;
