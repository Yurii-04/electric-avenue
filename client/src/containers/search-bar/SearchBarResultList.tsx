import Box from '@mui/material/Box';
import SearchResult from '~/components/search-result/SearchResult';
import { Product } from '~/types/products/interfaces/products.interfaces';

type SearchResultsListProps = {
  data: Product[];
}

export const SearchResultsList = ({ data }: SearchResultsListProps) => {
  const handleClick = (title: string) => {
    alert(`You selected ${title}`);
  };

  return (
    <Box className="results-list">
      {data.map((data) =>
        <SearchResult
          title={data.title}
          onClick={() => handleClick(data.title)}
          key={data.id}
        />,
      )}
    </Box>
  );
};
