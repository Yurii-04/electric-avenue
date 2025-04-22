import { FC } from 'react';
import { Button, Drawer } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { RelevantAttribute, SelectedAttributes } from '~/types';
import AttributeFilterAccordion from '~/components/attribute-filter-accordion/AttributeFilterAccordion';
import { styles } from '~/components/product-filter-drawer/styles';
import { AttributeFilterSkeleton } from '~/components/attribute-filter-skeleton/AttributeFilterSkeleton';

interface ProductFilterDrawerProps {
  open: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  attributes: RelevantAttribute[];
  selectedAttributes: SelectedAttributes;
  onAttributeChange: (attributeName: string, option: string, checked: boolean) => void;
  loading: boolean;
}

export const ProductFilterDrawer: FC<ProductFilterDrawerProps> = (
  {
    open,
    setIsDrawerOpen,
    attributes,
    selectedAttributes,
    onAttributeChange,
    loading,
  }) => {
  return (
    <>
      <Button
        sx={styles.filterBtn}
        onClick={() => setIsDrawerOpen(true)}
        variant="contained"
        size="medium"
        endIcon={<FilterAltIcon />}
      >
        Filters
      </Button>
      <Drawer open={open} onClose={() => setIsDrawerOpen(false)}>
        {loading ? (
          <AttributeFilterSkeleton sx={{ width: 280, p: 2 }} />
        ) : (
          attributes.map((attribute) => (
            <AttributeFilterAccordion
              key={attribute.name}
              attribute={attribute}
              onChange={onAttributeChange}
              selectedAttributes={selectedAttributes}
            />
          ))
        )}
      </Drawer>
    </>
  );
}; 