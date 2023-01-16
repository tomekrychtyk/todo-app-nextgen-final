import { createTheme, ThemeProvider, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TodoList from './features/todo/TodoList';
import ProjectList from './features/project/ProjectList';
import CategoryList from './features/category/CategoryList';
import AddTodo from './features/todo/AddTodo';

import Nav from './components/Nav/Nav';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <Grid container sx={{ padding: '16px' }}>
        <Grid item xl={2} xs={12}></Grid>
        <Grid item xl={8} xs={12}>
          <AddTodo />
        </Grid>
        <Grid item xl={2} xs={12}></Grid>
      </Grid>
      <Grid
        container
        sx={{
          padding: '16px',
        }}
      >
        <Grid item xl={1} xs={12} />
        <Grid item xl={7} xs={12}>
          <TodoList />
        </Grid>
        <Grid item xl={3} xs={12}>
          {/* <ProjectList /> */}
          <CategoryList />
        </Grid>
        <Grid item xl={1} xs={12} />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
