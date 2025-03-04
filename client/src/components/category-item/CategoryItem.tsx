import { Category } from '~/types';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import ImgIcon from '~/components/img-icon/ImgIcon';
import { ChevronRight } from '@mui/icons-material';
import { styles } from '~/components/category-item/styles';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { guestRoutes } from '~/router/constants/guestRoutes';

type CategoryItemProps = {
  category: Category
  onClick: (category: Category) => void;
  closeModal: () => void;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, onClick, closeModal }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (category.parentId && !category.isGroup) {
      closeModal();
      navigate(guestRoutes.products.searchByCategory(category.id));
    }
    onClick(category);
  };

  return (
    <ListItem sx={styles.li} disablePadding>
      <ListItemButton
        onClick={handleClick}
        sx={styles.liBtn}
      >
        <ImgIcon
          src={category.icon}
          alt={category.name}
          sx={styles.imgIcon}
        />
        <ListItemText primary={category.name} />
        <ChevronRight />
      </ListItemButton>
    </ListItem>
  );
};

export default CategoryItem;