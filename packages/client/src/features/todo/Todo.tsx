import { useState, useRef } from 'react';
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
import { ITodo } from '../todo/interfaces';
import { removeTodo } from './todoSlice';
import styles from './Todo.module.css';

const Todo = (props: { data: ITodo }) => {
  const {
    data: { _id, title },
  } = props;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentlyEdited, setCurrentlyEdited] = useState<null | string>(null);
  const [currentlyEditedTitle, setCurrentlyEditedTitle] = useState(title);
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
  };

  return (
    <ListItem className={styles.todoContainer}>
      {currentlyEdited ? (
        <>
          <TextField
            value={currentlyEditedTitle}
            onChange={(e) => setCurrentlyEditedTitle(e.target.value)}
            sx={{ width: '100%' }}
            autoFocus
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
              onClick={() =>
                console.log('handle save actipon', currentlyEdited)
              }
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
            primary={title}
            secondary='PROJECT NAME'
            className={styles.todoTitle}
          />
          <Box
            sx={{
              pl: '16px',
            }}
          >
            <Typography>Web Development</Typography>
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
                background: 'blueviolet',
                color: 'white',
              }}
              onClick={handleClick}
            >
              IN PROGRESS
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
              <MenuItem onClick={handleClose}>
                <Chip
                  label='DONE'
                  sx={{ backgroundColor: 'rgb(0, 148, 49)' }}
                  onClick={() => console.log('set as done')}
                  className={styles.statusButton}
                />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Chip
                  label='TO DO'
                  sx={{ backgroundColor: 'gray' }}
                  onClick={() => console.log('set as to do')}
                  className={styles.statusButton}
                />
              </MenuItem>
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
