import { useEffect } from 'react';
import {
  Card,
  CardContent,
  Paper,
  Typography,
  List,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { getCategoriesSummary } from '../category/categorySlice';
import { receivedCategories } from './categorySlice';
import { useGetCategoriesQuery } from './categoryApi';
import CategoryItem from './CategoryItem';
import AddCategory from './AddCategory';
import Loading from '@/components/Loading/Loading';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isUninitialized, isError } = useGetCategoriesQuery();
  const summary = useAppSelector(getCategoriesSummary);

  useEffect(() => {
    if (data) {
      dispatch(receivedCategories(data));
    }
  }, [data]);

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert
        severity='error'
        sx={{
          ml: {
            xl: '16px',
            lg: '0px',
          },
          mt: '8px',
        }}
      >
        <AlertTitle>Error fetching the categories</AlertTitle>
        Please try again or contact the administrator
      </Alert>
    );
  }

  return (
    <Paper
      sx={{
        ml: {
          xl: '16px',
          lg: '0px',
        },
        mt: '8px',
      }}
    >
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
