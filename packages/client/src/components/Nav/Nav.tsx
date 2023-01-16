import {
  AppBar,
  Box,
  Paper,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <AppBar position='static'>
      <Paper elevation={10}>
        <Container maxWidth='xl'>
          <Toolbar>
            <Grid container>
              <Grid>
                <Box>
                  <Typography
                    variant='h6'
                    noWrap
                    component='a'
                    className={styles.appTitle}
                  >
                    TODO APP
                    <Typography
                      variant='h5'
                      sx={{
                        fontSize: '12px',
                        color: 'orange',
                        paddingLeft: '4px',
                      }}
                    >
                      NextGEN
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </Paper>
    </AppBar>
  );
};

export default Nav;
