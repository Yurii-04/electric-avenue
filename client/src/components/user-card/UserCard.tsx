import { Box, Button, Divider } from '@mui/material';
import { Seller } from '~/types';
import { FC } from 'react';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { styles } from '~/components/user-card/styles';
import { Link } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

type UserCardProps = Omit<Seller, 'id' | 'photo'>

const UserCard: FC<UserCardProps> = ({ firstName, lastName, createdAt }) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.userTitle}>
        <PersonIcon />
        <Typography variant="h5">{firstName} {lastName}</Typography>
      </Box>
      <Typography variant="caption" color="basic.turquoiseDark">On Electric Avenue
        from {new Date(createdAt).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}</Typography>
      <Divider />
        <Button
          fullWidth
          endIcon={<ArrowForwardIosRoundedIcon />}
          variant='outlined'
          component={Link}
          to="#"
        >
          All ads by the author
        </Button>
    </Box>
  );
};

export default UserCard;