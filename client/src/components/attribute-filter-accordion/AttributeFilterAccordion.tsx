import React, { FC } from 'react';
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
import { RelevantAttribute } from '~/types';
import { styles } from '~/components/attribute-filter-accordion/styles';
import { useSearchParams } from 'react-router-dom';

type AttributeFilterAccordionProps = {
  attribute: RelevantAttribute;
}

const AttributeFilterAccordion: FC<AttributeFilterAccordionProps> = ({ attribute }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, attributeName: string) => {
    const { checked, name: optionValue } = e.target;
    if (checked) {
      searchParams.append(`attributes[${attributeName}][]`, optionValue);
    } else {
      const currentParams = searchParams.getAll(`attributes[${attributeName}][]`) || [];
      searchParams.delete(`attributes[${attributeName}][]`);
      currentParams.forEach(param => {
        if (param !== optionValue) {
          searchParams.append(`attributes[${attributeName}][]`, param);
        }
      });
    }
    setSearchParams(searchParams);
  };
  return (
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
                  name={option}
                  onChange={(e) => handleChange(e, attribute.name)}
                  checked={searchParams.getAll(`attributes[${attribute.name}][]`).includes(option)}
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
  );
};

export default AttributeFilterAccordion;