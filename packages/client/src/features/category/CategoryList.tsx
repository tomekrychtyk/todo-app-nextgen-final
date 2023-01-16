import { Card, CardContent, Paper, Typography, List } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { getCategoriesSummary } from '../todo/todoSlice';
import CategoryItem from './CategoryItem';
import AddCategory from './AddCategory';

const CategoryList = () => {
  const summary = useAppSelector(getCategoriesSummary);

  return (
    <Paper sx={{ ml: '16px', mt: '8px' }}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h5'>CATEGORIES</Typography>
          <List>
            {Object.entries(summary).map((item) => {
              const [id, cat] = item;
              return (
                <CategoryItem key={id}>
                  <>
                    {cat.name} ({cat.counter})
                  </>
                </CategoryItem>
              );
            })}
            <AddCategory />
          </List>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CategoryList;
