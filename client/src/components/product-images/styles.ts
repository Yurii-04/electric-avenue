export const styles = {
  container: {
    width: '100%',
    '& .swiper': {
      borderRadius: 1,
    },
  },
  mainWrapper: {
    '& img': {
      objectFit: 'contain',
      backgroundColor: '#fff',
    },
    '& .swiper': {
      width: '100%',
      aspectRatio: '1/1',
      marginBottom: 1,
      overflow: 'hidden',
    },
    '& .swiper-slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  previewWrapper: {
    '& .swiper': {
      width: '100%',
      height: '80px',
    },
    '& .swiper-slide': {
      backgroundColor: '#fff',
      overflow: 'hidden',
      cursor: 'pointer',
      opacity: '.5',
      transition: 'opacity .3s ease',
      '&.swiper-slide-thumb-active': {
        opacity: '1',
      },
    },
    '& img': {
      objectFit: 'contain',
    },
  },
};
