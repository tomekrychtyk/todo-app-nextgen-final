import { useState } from 'react';
import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { getCategoriesSummary } from '../todo/todoSlice';

const CategoryList = () => {
  const summary = useAppSelector(getCategoriesSummary);

  return (
    <Paper sx={{ ml: '16px', mt: '8px' }}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h5'>CATEGORIES</Typography>
          <ul>
            {Object.entries(summary).map((item) => {
              const [id, cat] = item;
              return (
                <li key={id}>
                  {cat.name} - {cat.counter}
                </li>
              );
            })}
          </ul>
          <Button variant='outlined'>Add new category</Button>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CategoryList;
