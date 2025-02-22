import { Category } from '~/types';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import ImgIcon from '~/components/img-icon/ImgIcon';
import { ChevronRight } from '@mui/icons-material';
import { styles } from '~/components/category-item/styles';

type CategoryItemProps = {
  category: Category
  onClick: (category: Category) => void;
  selected: boolean;
}

const CategoryItem = ({ category, onClick, selected }: CategoryItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onClick(category)}
        selected={selected}
        sx={styles.liBtn}
      >
        <ImgIcon
          src={category.icon}
          alt={category.name}
          sx={styles.imgIcon}
        />
        <ListItemText primary={category.name} />
        <ChevronRight sx={styles.chevronRight} />
      </ListItemButton>
    </ListItem>
  );
};

export default CategoryItem;