import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, TextField, Box } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { useAddNewCategoryMutation } from './categoryApi';
import { addCategory, updateId } from './categorySlice';

const AddCategory = () => {
  const dispatch = useAppDispatch();
  const [hasFormError, setHasFormError] = useState(false);
  const [addInProgress, setAddInProgress] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [apiAddCategory] = useAddNewCategoryMutation();

  const handleSetCategoryName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewCategoryName(e.target.value);
  };

  const handleKeyboardAdd = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleNewCategorySave();
    }
  };

  const handleNewCategorySave = () => {
    setHasFormError(false);

    if (!newCategoryName) {
      setHasFormError(true);
      return;
    }

    const tmpId = uuid();

    dispatch(
      addCategory({
        _id: tmpId,
        name: newCategoryName,
      })
    );

    apiAddCategory({ name: newCategoryName })
      .unwrap()
      .then((createdCategory) => {
        console.log('added', createdCategory);
        setAddInProgress(false);
        setNewCategoryName('');

        dispatch(
          updateId({
            tmpId,
            _id: createdCategory._id,
          })
        );
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
              autoFocus
              onChange={handleSetCategoryName}
              onKeyUp={(e) => {
                handleKeyboardAdd(e);
              }}
              error={hasFormError}
              helperText={hasFormError ? 'Category name is required' : ''}
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
