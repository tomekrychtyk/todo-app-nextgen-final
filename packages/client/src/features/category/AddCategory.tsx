import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, TextField, Box } from '@mui/material';
import { useAddNewCategoryMutation } from './categoryApi';

const AddCategory = () => {
  const [addInProgress, setAddInProgress] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [apiAddCategory] = useAddNewCategoryMutation();

  const handleSetCategoryName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewCategoryName(e.target.value);
  };

  const handleNewCategorySave = () => {
    const tmpId = uuid();

    apiAddCategory({ name: newCategoryName })
      .unwrap()
      .then((createdCategory) => {
        console.log('added', createdCategory);
      })
      .catch((error) => {
        console.log('Error saving new category', error);
      });
  };

  return (
    <>
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
    </>
  );
};

export default AddCategory;
