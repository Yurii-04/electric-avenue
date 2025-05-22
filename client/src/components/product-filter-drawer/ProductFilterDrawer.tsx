import { FC, useEffect, useState } from 'react';
import { Button, Drawer } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { RelevantAttribute } from '~/types';
import AttributeFilterAccordion from '~/components/attribute-filter-accordion/AttributeFilterAccordion';
import { styles } from '~/components/product-filter-drawer/styles';
import { AttributeFilterSkeleton } from '~/components/attribute-filter-skeleton/AttributeFilterSkeleton';
import { useSearchParams } from 'react-router-dom';

interface ProductFilterDrawerProps {
  attributes: RelevantAttribute[];
  loading: boolean;
}

export const ProductFilterDrawer: FC<ProductFilterDrawerProps> = ({ attributes, loading }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const hasAttributes = Array.from(searchParams.keys()).some(key => key.startsWith('attributes['));
    setIsOpen(prev => prev ?? hasAttributes);
  }, [searchParams]);

  return (
    <>
      <Button
        sx={styles.filterBtn}
        onClick={() => setIsOpen(true)}
        variant="contained"
        size="medium"
        endIcon={<FilterAltIcon />}
      >
        Filters
      </Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        {loading ? <AttributeFilterSkeleton sx={{ width: 280, p: 2 }} /> : (
          attributes.map((attribute) => (
            <AttributeFilterAccordion
              key={attribute.name}
              attribute={attribute}
            />
          ))
        )}
      </Drawer>
    </>
  );
}; 