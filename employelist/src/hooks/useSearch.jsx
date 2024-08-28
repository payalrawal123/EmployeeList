import { useMemo } from 'react';

const useSearch = (data, searchTerm) => {
  return useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);
};

export default useSearch;
