import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './style.css'
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { AccordionItem } from '~/types';
import { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styles } from '~/components/carousel/styles';

interface CarouselProps {
  items: AccordionItem[];
}

const Carousel: FC<CarouselProps> = ({ items }) => {
  return (
    <Box sx={styles.wrapper}>
      <Swiper
        spaceBetween={80}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
      >
        {items.map(item => (
          <SwiperSlide key={item.title}>
            <Box sx={{ pb: 5 }}>
              <Box>
                <Typography
                  sx={styles.title}
                  variant="h4"
                >
                  {item.title}
                </Typography>
                <Typography sx={styles.description}>{item.description}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;