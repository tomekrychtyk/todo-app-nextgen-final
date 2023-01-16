import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '@/app/hooks';
import { addTodo } from '../todo/todoSlice';
import { useAddNewTodoMutation } from './apiSlice';

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [addNewTodo, response] = useAddNewTodoMutation();

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoTitle(e.target.value);
  };

  const handleAdd = () => {
    dispatch(
      addTodo({
        title: todoTitle,
        _id: uuid(),
        status: 'todo',
        categories: [],
      })
    );

    addNewTodo({
      title: todoTitle,
      status: 'todo',
      categories: [],
    })
      .unwrap()
      .then(() => {
        console.log('Added successfully');
        setTodoTitle('');
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <TextField
          placeholder="Let's do something today..."
          sx={{ width: '80%' }}
          autoComplete='off'
          value={todoTitle}
          onChange={handleChange}
        />
        <Button
          sx={{ ml: '16px', height: '55px' }}
          variant='contained'
          onClick={handleAdd}
        >
          Add
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
      {showAdvanced ? <Box>Advanced</Box> : null}
    </>
  );
};

export default AddTodo;
