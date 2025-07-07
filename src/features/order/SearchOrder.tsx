import { type FormEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchOrder: FC = () => {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="focus:ring-opacity-50 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72"
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
