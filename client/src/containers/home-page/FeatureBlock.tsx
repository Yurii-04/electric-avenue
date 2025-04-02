import { FC, useState } from 'react';
import Carousel from '~/components/carousel/Carousel';
import { theme } from '~/styles/app-theme';
import { AccordionItem, TypographyVariantEnum } from '~/types';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { styles } from '~/containers/home-page/styles';
import Accordions from '~/components/accordion/Accordions';

import Computer from '~/assets/img/home-page/computer.png';

interface FeatureBlockProps {
  items: AccordionItem[];
}

const FeatureBlock: FC<FeatureBlockProps> = ({ items }) => {
  const [accordionActiveItemId, setAccordionActiveItemId] = useState<number>(0);
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={styles.feature}>
      <Box
        sx={styles.image}
        component="img"
        src={Computer}
        alt="Computer"
      />
      {isTablet ? (
        <Box sx={styles.carouselWrapper}>
          <Carousel items={items} />
        </Box>
      ) : (
        <Box className="section" data-testid="accordion" sx={styles.feature}>
          <Accordions
            activeIndex={accordionActiveItemId}
            descriptionVariant={TypographyVariantEnum.Body2}
            items={items}
            onChange={(id) => setAccordionActiveItemId(id)}
            titleVariant={TypographyVariantEnum.H6}
          />
        </Box>
      )}
    </Box>
  );
};

export default FeatureBlock;