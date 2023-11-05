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
import { profileData } from '../../profileData';

function ProfileDeletePage() {
  const profile = profileData[1];
  return (
    <div>
      <MenuBar />
      <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{profile.nickname}</Typography>
          <Typography variant="h6">{profile.name}</Typography>
          <Typography variant="h6">{profile.surname}</Typography>
          <Typography variant="h6">{profile.email}</Typography>
          <Typography variant="h6">{profile.number}</Typography>
          <Typography variant="h6">{profile.birthdate.toLocaleDateString()}</Typography>

          <Typography variant="h5">Confirm that you want to delete this account</Typography>
          <Button
                component={Link}
                to={`/`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                DELETE
              </Button>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
}

export default ProfileDeletePage;
