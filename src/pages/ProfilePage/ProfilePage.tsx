import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import MenuBar from '../../Components/MenuBar/MenuBar';
import { Link } from 'react-router-dom';
import { profileData } from '../../profileData';

function ProfilePage() {
  const profile = profileData[1];
  return (
    <div>
      <MenuBar />
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4">{profile.nickname}</Typography>
            <Typography variant="h6">{profile.email}</Typography>

            <Button
              component={Link}
              to={`/`}
              variant="contained"
              color="primary"
              fullWidth
            >
              Atsijungti
            </Button>
            <Button
              component={Link}
              to={`/Profile/Edit`}
              variant="contained"
              color="primary"
              fullWidth
            >
              Redaguoti paskyrą
            </Button>
            <Button
              component={Link}
              to={`/Profile/PasswordChange`}
              variant="contained"
              color="primary"
              fullWidth
            >
              Keisti slaptažodį
            </Button>
            <Button
              component={Link}
              to={`/Profile/Delete`}
              variant="contained"
              color="primary"
              fullWidth
            >
              Šalinti paskyrą
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ProfilePage;
