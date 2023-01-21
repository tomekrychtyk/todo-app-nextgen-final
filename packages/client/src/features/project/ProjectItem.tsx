import {
  Card,
  CardContent,
  Paper,
  Typography,
  List,
  ListItem,
  Box,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

type Props = {
  project: {
    _id: string;
    name: string;
    rundown?: {
      [key: string]: number | undefined;
    };
  };
};

const ProjectItem = ({ project }: Props) => {
  return (
    <ListItem
      sx={{
        width: '100%',
        height: '50px',
        display: 'block',
        mb: '16px',
      }}
    >
      <Typography>{project.name}</Typography>
      {project.rundown ? (
        <ResponsiveBar
          data={[
            {
              project: project.name,
              todo: project.rundown.todoPercent || 0,
              inProgress: project.rundown.inProgressPercent || 0,
              done: project.rundown.donePercent || 0,
            },
          ]}
          keys={['done', 'inProgress', 'todo']}
          layout='horizontal'
          indexBy='project'
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['yellowgreen', 'blueviolet', 'gray']}
          colorBy='id'
          axisTop={null}
          axisRight={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 3.6]],
          }}
          role='application'
          isInteractive={false}
          axisBottom={null}
        />
      ) : (
        <Typography sx={{ fontSize: '12px' }}>
          <i>No todos assigned to this project yet</i>
        </Typography>
      )}
    </ListItem>
  );
};

export default ProjectItem;
