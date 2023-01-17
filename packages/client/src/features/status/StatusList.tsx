import { useState } from 'react';
import {
  List,
  Chip,
  Typography,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { getStatusBackground } from '@/utils/todo';
import { useAppDispatch } from '@/app/hooks';
import { TodoStatus } from '../todo/interfaces';
import { setSelectedStatusFilter } from '../todo/todoSlice';

const StatusList = () => {
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState<string>();

  const handleStatusSelect = (status: string) => {
    let filter = '';
    setSelectedStatus((prev) => {
      if (prev === status) {
        return '';
      }

      filter = status;
      return status;
    });

    console.log(filter);

    if (status) {
      dispatch(setSelectedStatusFilter({ status: filter }));
    }
  };

  return (
    <Paper
      sx={{
        ml: {
          xl: '16px',
          lg: '0px',
        },
        mt: '8px',
      }}
    >
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h5'>STATUS</Typography>
          <List>
            <Chip
              onClick={() => handleStatusSelect(TodoStatus.toDo)}
              variant='outlined'
              label='TO DO'
              sx={{
                mr: '8px',
                cursor: 'pointer',
                backgroundColor:
                  selectedStatus === TodoStatus.toDo
                    ? getStatusBackground(selectedStatus)
                    : '',
              }}
            />
            <Chip
              onClick={() => handleStatusSelect(TodoStatus.inProgress)}
              variant='outlined'
              label='IN PROGRESS'
              sx={{
                mr: '8px',
                cursor: 'pointer',
                backgroundColor:
                  selectedStatus === TodoStatus.inProgress
                    ? getStatusBackground(selectedStatus)
                    : '',
              }}
            />
            <Chip
              onClick={() => handleStatusSelect(TodoStatus.done)}
              variant='outlined'
              label='DONE'
              sx={{
                cursor: 'pointer',
                backgroundColor:
                  selectedStatus === TodoStatus.done
                    ? getStatusBackground(selectedStatus)
                    : '',
              }}
            />
          </List>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default StatusList;
