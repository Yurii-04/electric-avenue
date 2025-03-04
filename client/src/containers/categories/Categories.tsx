import { FC, useCallback, useState } from 'react';
import { useAxios } from '~/hooks/use-axios';
import { Category, ErrorResponse, snackbarVariants } from '~/types';
import { Box, List, Divider, IconButton } from '@mui/material';
import { categoriesService } from '~/services/category-service';
import { useSnackbarContext } from '~/context/snackbar';
import { styles } from '~/containers/categories/styles';
import CategoryItem from '~/components/category-item/CategoryItem';
import { ArrowBack } from '@mui/icons-material';

type CategoriesProps = {
  closeModal: () => void
}

const Categories: FC<CategoriesProps> = ({closeModal}) => {
  const { setAlert } = useSnackbarContext();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const onResponseError = useCallback((error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    });
  }, [setAlert]);

  const { response: categories } = useAxios<Category[]>({
    service: useCallback(() => categoriesService.fetchCategories(), []),
    defaultResponse: [],
    onResponseError,
  });

  const handleCategoryClick = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const getCategories = (categories: Category[], parentId: number | null): Category[] =>
    categories.filter(category => category.parentId === parentId);


  const categoriesToShow = selectedCategory
    ? getCategories(categories, selectedCategory.id)
    : getCategories(categories, null);
  return (
    <Box>
      {selectedCategory && (
        <IconButton
          onClick={() => setSelectedCategory(null)}
          sx={styles.backButton}
        >
          <ArrowBack />
        </IconButton>
      )}
      <List sx={styles.list}>
        <Divider />
        {categoriesToShow.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            onClick={handleCategoryClick}
            closeModal={closeModal}
          />
        ))}
      </List>
    </Box>
  );
};

export default Categories;