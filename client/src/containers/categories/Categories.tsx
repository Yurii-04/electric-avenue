import { Category, ErrorResponse, snackbarVariants } from '~/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Container, List } from '@mui/material';
import { categoryHelper } from '~/utils/helper-category';
import { useAxios } from '~/hooks/use-axios';
import { categoriesService } from '~/services/category-service';
import { useSnackbarContext } from '~/context/snackbar';
import { styles } from '~/containers/categories/styles';
import SubcategoryList from '~/components/category-list/CategoryList';
import CategoryItem from '~/components/category-item/CategoryItem';

const Categories = () => {
  const { setAlert } = useSnackbarContext();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const serviceFunction = useCallback(
    () => categoriesService.fetchCategories(),
    [],
  );

  const onResponseError = useCallback((error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    });
  }, [setAlert]);

  const { response: categories } = useAxios<Category[]>({
    service: serviceFunction,
    defaultResponse: [],
    onResponseError,
  });

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const rootCategories = useMemo(() => categoryHelper.getRootCategories(categories), [categories]);
  const groups = useMemo(() => categoryHelper.getGroups(categories, selectedCategory?.id), [categories, selectedCategory?.id]);
  const items = useMemo(() => categoryHelper.getItems(categories), [categories]);

  return (
    <Container sx={styles.root}>
      <Box sx={styles.box}>
        <List sx={styles.list}>
          {rootCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              selected={selectedCategory?.id === category.id}
              onClick={setSelectedCategory}
            />
          ))}
        </List>
      </Box>
      {selectedCategory && (
        <SubcategoryList
          groups={groups}
          items={items}
        />
      )}
    </Container>
  );
};

export default Categories;