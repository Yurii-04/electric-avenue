import { Paper, useMediaQuery } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { RelevantAttribute } from '~/types';
import AttributeFilterAccordion from '~/components/attribute-filter-accordion/AttributeFilterAccordion';
import { ProductFilterDrawer } from '~/components/product-filter-drawer/ProductFilterDrawer';
import { styles } from '~/containers/product-attributes/styles';
import { theme } from '~/styles/app-theme';
import { AttributeFilterSkeleton } from '~/components/attribute-filter-skeleton/AttributeFilterSkeleton';

interface ProductAttributesProps {
  categoryId: string[];
}

const ProductAttributes: FC<ProductAttributesProps> = ({ categoryId }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { response, loading } = useAxios<RelevantAttribute[], string[]>({
    service: useCallback(() => productService.getRelevantAttributes(categoryId), [categoryId]),
    defaultResponse: [],
  });

  if (loading) return <AttributeFilterSkeleton sx={styles.paper} />;
  if(!response.length) return null;
  
  if (isTablet) {
    return (
      <ProductFilterDrawer
        attributes={response}
        loading={loading}
      />
    );
  }

  return (
    <Paper elevation={0} sx={styles.paper}>
      {response.map((attribute) => (
        <AttributeFilterAccordion
          key={attribute.name}
          attribute={attribute}
        />
      ))}
    </Paper>
  );
};

export default ProductAttributes;