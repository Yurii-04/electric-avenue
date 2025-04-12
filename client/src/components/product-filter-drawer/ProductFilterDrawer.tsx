import { FC } from 'react';
import { Button, Drawer } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { RelevantAttribute, SelectedAttributes } from '~/types';
import ProductAttributeItem from '~/components/product-attribute-item/ProductAttributeItem';
import { styles } from '~/components/product-filter-drawer/styles';

interface ProductFilterDrawerProps {
  open: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  attributes: RelevantAttribute[];
  selectedAttributes: SelectedAttributes;
  onAttributeChange: (attributeName: string, option: string, checked: boolean) => void;
}

export const ProductFilterDrawer: FC<ProductFilterDrawerProps> = (
  {
    open,
    setIsDrawerOpen,
    attributes,
    selectedAttributes,
    onAttributeChange,
  }) => {
  return (
    <>
      <Button
        sx={styles.filterBtn}
        onClick={() => setIsDrawerOpen(true)}
        variant="contained"
        size="large"
        endIcon={<FilterAltIcon />}
      >
        Filters
      </Button>
      <Drawer open={open} onClose={() => setIsDrawerOpen(false)}>
        {attributes.map((attribute) => (
          <ProductAttributeItem
            key={attribute.name}
            attribute={attribute}
            onChange={onAttributeChange}
            selectedAttributes={selectedAttributes}
          />
        ))}
      </Drawer>
    </>
  );
}; 