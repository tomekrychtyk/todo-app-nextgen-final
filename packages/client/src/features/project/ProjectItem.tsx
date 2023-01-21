import {
  Card,
  CardContent,
  Paper,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  {
    project: 'Node internals',
    done: 0,
    todo: 100,
  },
];

const ProjectItem = () => {
  return (
    <ListItem
      sx={{
        width: '100%',
        height: '50px',
        display: 'block',
        mb: '16px',
      }}
    >
      <Typography>Advanced Node.js</Typography>
      {false ? (
        <ResponsiveBar
          reverse
          data={data}
          keys={['todo', 'done']}
          layout='horizontal'
          indexBy='project'
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['gray', 'yellowgreen']}
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
