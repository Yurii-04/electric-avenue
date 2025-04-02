import Typography from '@mui/material/Typography';
import Container from '~/components/container/Container';
import { styles } from '~/pages/home/styles';
import { Box } from '@mui/material';
import { accordionData } from '~/containers/home-page/accordion-with-image.constants';
import FeatureBlock from '~/containers/home-page/FeatureBlock';

const Home = () => {
  return (
    <Container>
      <Box sx={styles.firstSection} component="section">
        <Box sx={styles.textContainer}>
          <Typography
            sx={styles.title}
            variant="h1"
          >
            Choose the best electronics!
          </Typography>
          <Typography sx={styles.description}>
            Electric Avenue is your reliable marketplace for buying modern electronics.
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.secondSection} component="section">
        <FeatureBlock items={accordionData} />
      </Box>
    </Container>
  );
};

export default Home;