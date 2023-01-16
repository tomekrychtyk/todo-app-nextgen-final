import { Card, CardContent, Paper, Typography } from '@mui/material';

const ProjectList = () => {
  return (
    <Paper sx={{ ml: '16px', mt: '8px' }}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h5'>PROJECTS</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default ProjectList;
