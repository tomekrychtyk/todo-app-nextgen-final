import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  List,
  TextField,
  Box,
} from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { getCategoriesSummary } from '../todo/todoSlice';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const summary = useAppSelector(getCategoriesSummary);
  const [addInProgress, setAddInProgress] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSetCategoryName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewCategoryName(e.target.value);
  };

  const handleNewCategorySave = () => {
    console.log('Saving new category:', newCategoryName);
  };

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
          </List>
          {addInProgress ? (
            <>
              <Box sx={{ pb: '16px' }}>
                <TextField
                  value={newCategoryName}
                  placeholder='Category name'
                  sx={{ width: '90%' }}
                  onChange={handleSetCategoryName}
                />
              </Box>
              <Button
                variant='outlined'
                sx={{ mr: '16px' }}
                onClick={() => setAddInProgress(false)}
              >
                Cancel
              </Button>
              <Button variant='contained' onClick={handleNewCategorySave}>
                Save
              </Button>
            </>
          ) : (
            <Button variant='outlined' onClick={() => setAddInProgress(true)}>
              Add new category
            </Button>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CategoryList;
