import React from 'react';
import MenuBar from '../../Components/MenuBar/MenuBar';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <MenuBar />
      <Container component="main" maxWidth="xs">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 32,
          }}
        >
          <Paper
            elevation={3}
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Login</Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                to={`/`}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
