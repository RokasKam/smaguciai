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

function ProfileEditPage() {
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

          <Typography variant="h5">Edit</Typography>
            <form noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                autoComplete="nickname"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="First Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="surname"
                label="Last Name"
                name="surname"
                autoComplete="surname"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
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
                fullWidth
                id="number"
                label="Phone Number"
                name="number"
                autoComplete="number"
                autoFocus
              />
              <Button
                component={Link}
                to={`/Profile`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </form>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
}

export default ProfileEditPage;
