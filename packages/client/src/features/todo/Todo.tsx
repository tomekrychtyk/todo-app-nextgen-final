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
  Select,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getStatusBackground } from '@/utils/todo';
import { ITodo, TodoStatus } from '../todo/interfaces';
import { removeTodo, editTodo, setStatus } from './todoSlice';
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useUpdateStatusMutation,
} from './todoApi';
import styles from './Todo.module.css';
import { IProject } from '../project/interfaces';

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
    data: { _id, title, status, category, project },
  } = props;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentlyEdited, setCurrentlyEdited] = useState<null | string>(null);
  const [currentlyEditedTitle, setCurrentlyEditedTitle] = useState(title);
  const [selectedProject, setSelectedProject] = useState<IProject>();
  const [isProjectSelectDirty, setIsProjectSelectDirty] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const [apiEditTodo] = useEditTodoMutation();
  const [apiUpdateStatus] = useUpdateStatusMutation();
  const projects = useAppSelector((state) => state.projects.items);

  const open = Boolean(anchorEl);

  const handleProjectSelect = (e: SelectChangeEvent<string>) => {
    const project = projects.find((item) => item._id === e.target.value);
    setSelectedProject(project);
    setIsProjectSelectDirty(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusClose = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnchorEl(null);
  };

  const handleEditCancel = (originalTitle: string) => {
    setCurrentlyEdited(null);
    setCurrentlyEditedTitle(originalTitle);
    setIsProjectSelectDirty(false);
    setSelectedProject({
      _id: 'no-project',
      name: 'No project',
    });
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
        project: selectedProject,
      })
    );

    apiEditTodo({
      _id,
      title: currentlyEditedTitle,
      project: selectedProject,
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

  const valueForProjectSelect = isProjectSelectDirty
    ? selectedProject?._id || 'no-project'
    : project?._id || 'no-project';

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
            sx={{ width: '85%' }}
            autoFocus
            onKeyDown={(e) => handleKeyboardEdit(e, _id)}
          />
          <Select
            sx={{
              ml: '8px',
            }}
            labelId='category-select-label'
            id='category-select'
            value={valueForProjectSelect}
            onChange={handleProjectSelect}
          >
            <MenuItem value='no-project'>No project</MenuItem>
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
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
            secondary={project?.name || ''}
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
              onClose={handleStatusClose}
              TransitionComponent={Fade}
            >
              {getAvailableStatuses(status).map((item) => {
                return (
                  <MenuItem onClick={handleStatusClose} key={item}>
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
