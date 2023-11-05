import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import MenuBar from '../../Components/MenuBar/MenuBar';
import { Link } from 'react-router-dom';

function PasswordChangePage() {
  return (
    <div>
      <MenuBar />
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h3">Change Password</Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Current Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Repeat Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                component={Link}
                to={`/Profile`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default PasswordChangePage;
