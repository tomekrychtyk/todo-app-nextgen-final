import { ListItem } from '@mui/material';

type Props = {
  children: JSX.Element;
};

const CategoryItem = (props: Props) => {
  return <ListItem>{props.children}</ListItem>;
};

export default CategoryItem;
