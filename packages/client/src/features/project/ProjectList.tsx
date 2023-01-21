import { useEffect } from 'react';
import {
  Card,
  CardContent,
  Paper,
  Typography,
  List,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Loading from '@/components/Loading/Loading';
import ProjectItem from './ProjectItem';
import AddProject from './AddProject';
import { receivedProjects, getProjectsSummary } from './projectSlice';
import { useGetProjectsQuery } from './projectApi';

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isUninitialized, isError } = useGetProjectsQuery();
  const summary = useAppSelector(getProjectsSummary);

  useEffect(() => {
    if (data) {
      dispatch(receivedProjects(data));
    }
  }, [data]);

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert
        severity='error'
        sx={{
          ml: {
            xl: '16px',
            lg: '0px',
          },
          mt: '8px',
        }}
      >
        <AlertTitle>Error fetching the projects</AlertTitle>
        Please try again or contact the administrator
      </Alert>
    );
  }

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
          <Typography variant='h5'>PROJECTS</Typography>
          <List sx={{ pb: '32px' }}>
            {Object.entries(summary).map((item) => {
              const [id, project] = item;
              return <ProjectItem project={{ ...project, _id: id }} key={id} />;
            })}
          </List>
          <AddProject />
        </CardContent>
      </Card>
    </Paper>
  );
};
export default ProjectList;
