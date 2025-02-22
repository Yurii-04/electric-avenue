import { Typography } from '@mui/material';
import { Category } from '~/types';
import Box from '@mui/material/Box';
import ImgIcon from '~/components/img-icon/ImgIcon';
import { styles } from '~/components/category-list/styles';

type SubcategoryListProps = {
  groups: Category[];
  items: Category[];
}

const SubcategoryList = ({ groups, items }: SubcategoryListProps) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.wrapper}>
        {groups.map(group => (
          <Box key={group.id}>
            <Box sx={styles.groupWrapper}>
              <ImgIcon
                src={group.icon}
                alt={group.name}
                sx={styles.imgIcon}
              />
              <Typography variant="subtitle1">
                {group.name}
              </Typography>
            </Box>
            <Box component="ul" sx={styles.ul}>
              {items
                .filter(item => item.parentId === group.id)
                .map((item) => (
                  <Box
                    component="li"
                    key={item.id}
                    sx={styles.li}
                  >
                    {item.name}
                  </Box>
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SubcategoryList;
