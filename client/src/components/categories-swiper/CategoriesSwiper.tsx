import { useState } from 'react';
import { useAxios } from '~/hooks/use-axios';
import { Box, Card, CardActionArea, CardContent, Skeleton, Typography } from '@mui/material';
import { categoriesService } from '~/services/category-service';
import { Category } from '~/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { styles } from '~/components/categories-swiper/styles';
import { useSearchParams } from 'react-router-dom';
import { FreeMode, Pagination } from 'swiper/modules';

const CategoriesSwiper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCard, setSelectedCard] = useState<string>('');
  const { response, loading } = useAxios<Category[]>({
    service: categoriesService.fetchChildrenCategories,
    defaultResponse: [],
  });

  if (loading) {
    return (
      <Box sx={styles.wrapper}>
        <Skeleton variant="text" height={44} sx={{ mb: 1, width: 250 }} />
        <Box sx={styles.skeletonWrapper}>
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} variant="rounded" width={200} height={100} sx={{ flexShrink: 0 }} />
          ))}
        </Box>
      </Box>
    );
  }

  const handleClick = (categoryId: string) => {
    setSelectedCard(categoryId);
    searchParams.set('category', categoryId);
    setSearchParams(searchParams);
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" gutterBottom>Categories</Typography>
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        autoHeight={false}
        pagination={{ dynamicBullets: true, clickable: true}}
        freeMode={{ enabled: true }}
        modules={[Pagination, FreeMode]}
      >
        {response.map((category) => (
          <SwiperSlide
            key={category.id}
            style={styles.swiperSlide}
          >
            <Card variant="outlined" sx={styles.card}>
              <CardActionArea
                sx={styles.cardActionArea}
                data-active={selectedCard === category.id ? '' : undefined}
                onClick={() => handleClick(category.id)}
              >
                <CardContent sx={styles.cardContent}>
                  <Typography variant="subtitle2">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CategoriesSwiper;
