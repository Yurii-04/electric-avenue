import { Typography, Paper, useMediaQuery } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { RelevantAttribute, ProductWithPagination, FindProductsParams } from '~/types';
import { useAttributeFilter } from '~/hooks/useAttributeFilter';
import Loader from '~/components/loader/Loader';
import ProductAttributeItem from '~/components/product-attribute-item/ProductAttributeItem';
import { ProductFilterDrawer } from '~/components/product-filter-drawer/ProductFilterDrawer';
import { styles } from '~/containers/product-attributes/styles';
import { theme } from '~/styles/app-theme';

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
    fetchProducts
  });

  const { response: attributes, loading: attributesLoading } = useAxios<RelevantAttribute[], string[]>({
    service: useCallback(() => productService.getRelevantAttributes(categoryIds), [categoryIds]),
    defaultResponse: [],
  });
  if (attributesLoading) {
    return <Loader />;
  }

  if (!attributes.length) {
    return (
      <Typography variant="body1">
        No attributes available for this category
      </Typography>
    );
  }

  if (isTablet) {
    return (
      <ProductFilterDrawer
        open={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        attributes={attributes}
        selectedAttributes={selectedAttributes}
        onAttributeChange={handleAttributeChange}
      />
    );
  }

  return (
    <Paper elevation={0} sx={styles.paper}>
      {attributes.map((attribute) => (
        <ProductAttributeItem
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