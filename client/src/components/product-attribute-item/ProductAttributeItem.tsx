import React, { FC, memo } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RelevantAttribute, SelectedAttributes } from '~/types';
import { styles } from '~/components/product-attribute-item/styles';

interface ProductAttributeItemProps {
  attribute: RelevantAttribute;
  onChange: (attributeName: string, option: string, checked: boolean) => void;
  selectedAttributes: SelectedAttributes;
}

const ProductAttributeItem: FC<ProductAttributeItemProps> = memo(({
  attribute,
  onChange,
  selectedAttributes,
}) => (
  <Accordion defaultExpanded sx={styles.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={styles.accordionSummary}
    >
      <Typography sx={styles.attributeTitle}>
        {attribute.name}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormGroup>
        {attribute.attributeOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                sx={styles.checkbox}
                size="small"
                onChange={(event) => onChange(attribute.name, option, event.target.checked)}
                checked={selectedAttributes[attribute.name]?.includes(option) || false}
              />
            }
            label={
              <Typography variant="body2">
                {option}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </AccordionDetails>
  </Accordion>
));

ProductAttributeItem.displayName = 'ProductAttributeItem';

export default ProductAttributeItem; 