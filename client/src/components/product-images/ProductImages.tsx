import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { ProductImages as IProductImages } from '~/types';
import { Thumbs } from 'swiper/modules';
import { styles } from '~/components/product-images/styles';
import './style.css';

type ProductImagesProps = {
  images: IProductImages[];
}

const ProductImages: FC<ProductImagesProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const slides = images.map((image, index) => (
    <SwiperSlide key={image.publicId} >
      <Box
        component='img'
        src={image.url}
        alt={`Product image ${index + 1}`}
        sx={{ width: '100%', height: '100%' }}
      />
    </SwiperSlide>
  ))

  return (
   <Box sx={styles.container}>
     <Box sx={styles.mainWrapper}>
       <Swiper
         spaceBetween={10}
         thumbs={{ swiper: thumbsSwiper }}
         modules={[Thumbs]}
       >
         {slides}
       </Swiper>
     </Box>
     <Box sx={styles.previewWrapper}>
       <Swiper
         onSwiper={setThumbsSwiper}
         spaceBetween={5}
         slidesPerView="auto"
         watchSlidesProgress={true}
         modules={[Thumbs]}
         breakpoints={{
           200: { slidesPerView: 3 },
           480: { slidesPerView: 5 },
         }}
       >
         {slides}
       </Swiper>
     </Box>
   </Box>
  );
};

export default ProductImages;