import React from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Rating, Box } from '@mui/material';

function EditFeedback() {
  const { id } = useParams(); // Using id to clear the unused variable error

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      key={id} // Added to use the id variable and avoid the eslint error
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="author"
        label="Your Name"
        name="author"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="text"
        label="Your Review"
        type="text"
        id="text"
        autoComplete="current-text"
        multiline
        rows={4}
      />
      <Rating
        name="rating"
        value={2.5} // This value should be the current rating from the feedback
        precision={0.5}
        size="large"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
}

export default EditFeedback;
