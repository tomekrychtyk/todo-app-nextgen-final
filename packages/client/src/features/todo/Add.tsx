import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '@/app/hooks';
import { addTodo, updateId } from '../todo/todoSlice';
import { useAddNewTodoMutation } from './todoApi';
import { TodoStatus } from './interfaces';

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

  const handleKeyAdd = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleAdd = () => {
    const tmpId = uuid();
    dispatch(
      addTodo({
        title: todoTitle,
        _id: tmpId,
        status: TodoStatus.toDo,
        category: {
          _id: '',
          name: '',
        },
      })
    );

    addNewTodo({
      title: todoTitle,
      status: TodoStatus.toDo,
      category: {
        _id: '',
        name: '',
      },
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
          Add todo
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
