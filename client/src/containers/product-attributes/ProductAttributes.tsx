import { Paper, useMediaQuery } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { RelevantAttribute, ProductWithPagination, FindProductsParams } from '~/types';
import { useAttributeFilter } from '~/hooks/useAttributeFilter';
import AttributeFilterAccordion from '~/components/attribute-filter-accordion/AttributeFilterAccordion';
import { ProductFilterDrawer } from '~/components/product-filter-drawer/ProductFilterDrawer';
import { styles } from '~/containers/product-attributes/styles';
import { theme } from '~/styles/app-theme';
import { AttributeFilterSkeleton } from '~/components/attribute-filter-skeleton/AttributeFilterSkeleton';

interface ProductAttributesProps {
  categoryIds: string[];
  setProducts: (products: ProductWithPagination) => void;
  fetchProducts: (params?: FindProductsParams) => Promise<void>;
}

const ProductAttributes: FC<ProductAttributesProps> = (
  {
    categoryIds,
    setProducts,
    fetchProducts,
  }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { selectedAttributes, handleAttributeChange } = useAttributeFilter({
    onProductsUpdate: setProducts,
    fetchProducts,
  });

  const { response, loading } = useAxios<RelevantAttribute[], string[]>({
    service: useCallback(() => productService.getRelevantAttributes(categoryIds), [categoryIds]),
    defaultResponse: [],
  });

  if (isTablet) {
    return (
      <ProductFilterDrawer
        open={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        attributes={response}
        selectedAttributes={selectedAttributes}
        onAttributeChange={handleAttributeChange}
        loading={loading}
      />
    );
  }

  if (loading) return <AttributeFilterSkeleton sx={styles.paper} />;

  return (
    <Paper elevation={0} sx={styles.paper}>
      {response.map((attribute) => (
        <AttributeFilterAccordion
          key={attribute.name}
          attribute={attribute}
          onChange={handleAttributeChange}
          selectedAttributes={selectedAttributes}
        />
      ))}
    </Paper>
  );
};

export default ProductAttributes;