import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuBar from '../../Components/MenuBar/MenuBar';
import { useCart } from '../../Context/CartContext';
import { Toy } from '../../Interfaces/Toy';
import { useUserContext } from '../../Context/UserContext';

interface Photo {
  url: string;
  alterText: string;
  productId: string;
}

function ToyDetails() {
  const { id } = useParams<{ id: string }>();
  const [toy, setToy] = useState<Toy | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { user } = useUserContext();
  useEffect(() => {
    // Make the API request to get details of a specific toy
    axios
      .get<Toy>(`https://localhost:7026/api/Product/GetById/${id}`)
      .then((response) => setToy(response.data))
      .catch((error) => console.error('Error fetching toy details:', error));
    axios
      .get<Photo[]>(`https://localhost:7026/api/Photo/GetAll?productId=${id}`)
      .then((response) => setPhotos(response.data.map((photo) => photo.url)))
      .catch((error) => console.error('Error fetching photos:', error));
  }, [id]);

  const { addToCart } = useCart();

  if (!toy) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    // Check if the wanted amount is lower than product amount
    if (quantity > toy.amount) {
      setSnackbarMessage('Wanted amount exceeds available stock.');
      setSnackbarOpen(true);
    } else {
      addToCart(toy, quantity);
      setSnackbarMessage('Product added to cart successfully.');
      setSnackbarOpen(true);
      setDialogOpen(false); // Close the dialog after adding to cart
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <MenuBar />
      <Button
        component={Link}
        to="/List"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 8 }}
      >
        Go back to list
      </Button>
      <Container>
        <Card>
          {photos.length > 0 && (
            <div>
              <Typography variant="h5">Photos</Typography>
              <Grid container spacing={2}>
                {photos.map((photo, index) => (
                  <Grid item key={index}>
                    <CardMedia
                      component="img"
                      height="200"
                      width="200"
                      image={photo}
                      alt={`Photo ${index + 1}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
          <CardContent>
            <Typography variant="h4">{toy.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {toy.description}
            </Typography>
            <Typography variant="h6" color="primary">
              {toy.price}
            </Typography>
            {user?.Role === 'Admin' && (
              <>
                <div>
                  <Link to={`/edit/${toy.id}`}>
                    <Button variant="contained" color="primary">
                      Edit Item
                    </Button>
                  </Link>
                </div>
                <div>
                  {/* Remove Item Button */}
                  <Link to={`/Remove/${toy.id}`}>
                    <Button variant="contained" color="primary">
                      Remove Item
                    </Button>
                  </Link>
                </div>
              </>
            )}
            <div>
              <Button variant="contained" onClick={handleOpenDialog}>
                Choose Amount
              </Button>
              <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Choose Amount</DialogTitle>
                <DialogContent>
                  <TextField
                    type="number"
                    label="Amount"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleIncrement}>Increment</Button>
                  <Button onClick={handleDecrement}>Decrement</Button>
                  <Button onClick={handleAddToCart} color="primary">
                    Add to Cart
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            {/* Snackbar for displaying messages */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message={snackbarMessage}
            />

            <div>
              <Typography variant="h5">Feedback</Typography>
              <Button
                component={Link}
                to={`/Toys/${id}/Feedback`}
                variant="contained"
                color="primary"
                fullWidth
              >
                Click to see feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ToyDetails;
