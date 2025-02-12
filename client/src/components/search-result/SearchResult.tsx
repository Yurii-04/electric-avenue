import Box from '@mui/material/Box';

type SearchResultProps = {
  title: string
  onClick: () => void
}

const SearchResult = ({ title, onClick }: SearchResultProps) =>
  <Box onClick={onClick}>
    {title}
  </Box>;

export default SearchResult;