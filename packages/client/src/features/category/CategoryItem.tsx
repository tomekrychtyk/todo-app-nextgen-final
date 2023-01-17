import { useState } from 'react';
import { Button, ListItem } from '@mui/material';

type Props = {
  category: { _id: string; name: string; counter: number };
  selectedFilter: string;
  onFilterSelect: (_id: string) => void;
};

const CategoryItem = ({
  category: { _id, name, counter },
  onFilterSelect,
  selectedFilter,
}: Props) => {
  return (
    <ListItem>
      <Button
        sx={{ color: 'white' }}
        onClick={() => onFilterSelect(_id)}
        variant={selectedFilter === _id ? 'contained' : 'text'}
      >
        {name} ({counter})
      </Button>
    </ListItem>
  );
};

export default CategoryItem;
