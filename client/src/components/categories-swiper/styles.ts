export const styles = {
  skeletonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    gap: 2,
    flexWrap: 'nowrap',
    WebkitOverflowScrolling: 'touch'
  },
  wrapper: {
    backgroundColor: 'white',
    p: 2,
    borderRadius: 1,
    width: '100%',
    '& > .swiper': {
      py: 1,
    },
    '& .swiper-pagination': {
      bottom: '0'
    }
  },
  swiperSlide: {
    width: 'auto',
    maxWidth: '200px',
    height: '100px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s ease',
    '&[data-active]': {
      backgroundColor: 'action.selected',
      '&:hover': {
        backgroundColor: 'action.selectedHover',
      },
    },
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    placeItems: 'center',
    p: 2,
    '& > .MuiTypography-root': {
      textAlign: 'center',
    },
  },
};