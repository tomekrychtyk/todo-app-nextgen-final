import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '@/app/hooks';
import { addTodo, updateId } from './todoSlice';
import { useAddNewTodoMutation } from './todoApi';
import { TodoStatus } from './interfaces';
import AddAdvancedOptions from './AddAdvancedOptions';
import { ICategory } from '../category/interfaces';

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [hasFormError, setHasFormError] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<null | ICategory>(
    null
  );
  const [addNewTodo, response] = useAddNewTodoMutation();

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoTitle(e.target.value);
  };

  const handleKeyAdd = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleCategorySelect = (category: { _id: string; name: string }) => {
    setSelectedCategory(category);
  };

  const handleAdd = () => {
    setHasFormError(false);

    if (!todoTitle) {
      setHasFormError(true);
      return;
    }

    const tmpId = uuid();
    const category = selectedCategory || {
      _id: '',
      name: '',
    };

    dispatch(
      addTodo({
        title: todoTitle,
        _id: tmpId,
        status: TodoStatus.toDo,
        category,
      })
    );

    addNewTodo({
      title: todoTitle,
      status: TodoStatus.toDo,
      category,
    })
      .unwrap()
      .then((createdTodo) => {
        setTodoTitle('');
        dispatch(
          updateId({
            _id: createdTodo._id,
            tmpId,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <TextField
          placeholder="Let's do something today..."
          sx={{
            width: {
              xs: '65%',
              md: '85%',
            },
          }}
          helperText={
            hasFormError ? 'You need to specify what you plan to do' : ''
          }
          error={hasFormError}
          autoComplete='off'
          value={todoTitle}
          onChange={handleChange}
          onKeyUp={(e) => {
            handleKeyAdd(e);
          }}
          disabled={response.status === 'pending'}
        />
        <Button
          sx={{ ml: '16px', height: '55px' }}
          variant='contained'
          onClick={handleAdd}
          disabled={response.status === 'pending'}
        >
          Add Todo
        </Button>
      </Box>
      <Box>
        <Button onClick={toggleAdvanced}>
          {!showAdvanced ? (
            <Typography>+ SHOW ADVANCED OPTIONS</Typography>
          ) : (
            <Typography>- HIDE ADVANCED OPTIONS</Typography>
          )}
        </Button>
      </Box>
      {showAdvanced ? (
        <AddAdvancedOptions
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      ) : null}
    </>
  );
};

export default AddTodo;
