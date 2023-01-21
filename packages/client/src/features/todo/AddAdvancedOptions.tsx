import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { ICategory } from '../category/interfaces';

type Props = {
  onCategorySelect: (category: { _id: string; name: string }) => void;
  selectedCategory: null | ICategory;
};

const AddAdvancedOptions = ({ onCategorySelect, selectedCategory }: Props) => {
  const categories = useAppSelector((state) => state.categories.items);
  const handleSelect = (e: SelectChangeEvent<string>) => {
    const category = categories.find((item) => item._id === e.target.value);
    if (category) {
      onCategorySelect(category);
    } else {
      onCategorySelect({
        _id: '',
        name: '',
      });
    }
  };

  return (
    <Box>
      <Select
        sx={{
          mt: '8px',
        }}
        labelId='category-select-label'
        id='category-select'
        value={selectedCategory?._id || 'uncategorized'}
        onChange={handleSelect}
      >
        <MenuItem value='uncategorized'>Uncategorized</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default AddAdvancedOptions;
