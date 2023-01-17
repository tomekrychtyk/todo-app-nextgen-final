import { useState } from 'react';
import {
  ListItem,
  IconButton,
  ListItemText,
  Box,
  Chip,
  Typography,
  Button,
  Menu,
  MenuItem,
  Fade,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from '@/app/hooks';
import { ITodo, TodoStatus } from '../todo/interfaces';
import { removeTodo, editTodo, setStatus } from './todoSlice';
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useUpdateStatusMutation,
} from './todoApi';
import styles from './Todo.module.css';

const getStatusBackground = (status: TodoStatus) => {
  switch (status) {
    case TodoStatus.toDo: {
      return 'gray';
    }

    case TodoStatus.inProgress: {
      return 'blueviolet';
    }

    case TodoStatus.done: {
      return 'yellowgreen';
    }
  }
};

const getAvailableStatuses = (currentStatus: TodoStatus) => {
  const statuses = [TodoStatus.toDo, TodoStatus.inProgress, TodoStatus.done];
  const available: TodoStatus[] = [];

  for (const status of statuses) {
    if (status !== currentStatus) {
      available.push(status);
    }
  }

  return available;
};

const Todo = (props: { data: ITodo }) => {
  const {
    data: { _id, title, status, category },
  } = props;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentlyEdited, setCurrentlyEdited] = useState<null | string>(null);
  const [currentlyEditedTitle, setCurrentlyEditedTitle] = useState(title);
  const [deleteTodo] = useDeleteTodoMutation();
  const [apiEditTodo] = useEditTodoMutation();
  const [apiUpdateStatus] = useUpdateStatusMutation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(null);
  };

  const handleEditCancel = (originalTitle: string) => {
    setCurrentlyEdited(null);
    setCurrentlyEditedTitle(originalTitle);
  };

  const handleRemove = (_id: string) => {
    dispatch(
      removeTodo({
        _id,
      })
    );

    deleteTodo({ _id })
      .then(() => {
        console.log('Success');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (_id: string) => {
    dispatch(
      editTodo({
        _id,
        title: currentlyEditedTitle,
      })
    );

    apiEditTodo({
      _id,
      title: currentlyEditedTitle,
    })
      .then(() => {
        console.log('Successfully edited todo');
      })
      .catch((error) => {
        console.log('error editing todo', error);
      });
    setCurrentlyEdited(null);
  };

  const handleUpdateStatus = (_id: string, status: TodoStatus) => {
    dispatch(setStatus({ _id, status }));

    apiUpdateStatus({ _id, status })
      .then(() => {
        console.log('Status updated');
      })
      .catch((error) => {
        console.log('Error updating status: ', error);
      });
  };

  const handleKeyboardEdit = (
    e: React.KeyboardEvent<HTMLDivElement>,
    _id: string
  ) => {
    if (e.key === 'Enter') {
      handleEdit(_id);
    }
  };

  return (
    <ListItem
      className={styles.todoContainer}
      style={{ borderLeftColor: getStatusBackground(status) }}
    >
      {currentlyEdited ? (
        <>
          <TextField
            value={currentlyEditedTitle}
            onChange={(e) => setCurrentlyEditedTitle(e.target.value)}
            sx={{ width: '100%' }}
            autoFocus
            onKeyDown={(e) => handleKeyboardEdit(e, _id)}
          />
          <Box className={styles.iconsContainer}>
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={() => handleEditCancel(title)}
            >
              <CancelIcon sx={{ color: 'crimson' }} />
            </IconButton>
            <IconButton
              edge='end'
              aria-label='edit'
              onClick={() => handleEdit(_id)}
            >
              <CheckCircleIcon sx={{ color: 'yellowgreen' }} />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <ListItemText
            onClick={() => {
              setCurrentlyEdited(_id);
            }}
            primary={
              <Typography
                sx={{
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                }}
              >
                {title}
              </Typography>
            }
            className={styles.todoTitle}
          />
          <Box
            sx={{
              pl: '16px',
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: '12px',
                  md: '14px',
                },
              }}
            >
              {category.name || 'Uncategorized'}
            </Typography>
          </Box>
          <Box
            sx={{
              pl: '16px',
              pr: '16px',
            }}
          >
            <Button
              className={styles.statusButton}
              sx={{
                background: getStatusBackground(status),
                color: 'white',
              }}
              onClick={handleClick}
            >
              {status}
            </Button>
            <Menu
              id='fade-menu'
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {getAvailableStatuses(status).map((item) => {
                return (
                  <MenuItem onClick={handleClose} key={item}>
                    <Chip
                      label={item}
                      sx={{ backgroundColor: getStatusBackground(item) }}
                      onClick={() => handleUpdateStatus(_id, item)}
                      className={styles.statusButton}
                    />
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box className={styles.iconsContainer}>
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={() => handleRemove(_id)}
            >
              <DeleteIcon sx={{ color: 'crimson' }} />
            </IconButton>
            <IconButton
              edge='end'
              aria-label='edit'
              onClick={() => setCurrentlyEdited(_id)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </>
      )}
    </ListItem>
  );
};

export default Todo;
