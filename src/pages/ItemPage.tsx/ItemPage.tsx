import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField, // Import TextField from Material-UI
  Grid, // Import MenuItem from Material-UI
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toysData } from '../../toysData';
import { useCart } from '../../Context/CartContext';

function ToyDetails() {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ?? '-1';
  const toy = toysData[parseInt(parsedId, 10)];
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); // State to store the selected quantity

  if (!toy) {
    return <div>Toy not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(toy, quantity);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={toy.imageUrl}
          alt={toy.name}
        />
        <CardContent>
          <Typography variant="h4">{toy.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {toy.description}
          </Typography>
          <Typography variant="h6" color="primary">
            {toy.price}
          </Typography>
          <div>
              {/* Edit Item Button */}
              <Link to={`/edit/${toy.id}`}>
                <Button variant="outlined" color="primary">
                  Edit Item
                </Button>
              </Link>
            </div>
            <div>
            {/* Remove Item Button */}
          <Link to={`/Remove/${toy.id}`}>
            <Button variant="outlined" color="secondary">
              Remove Item
            </Button>
          </Link>
          </div>

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button variant="contained" onClick={handleDecrement}>
                -
              </Button>
            </Grid>
            <Grid item>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleIncrement}>
                +
              </Button>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          {/* Feedback Section */}
          <div>
            <Typography variant="h5">Feedback</Typography>
            {toy.feedback.map((feedback, index) => (
              <div key={index}>
                <Typography variant="body2" color="textSecondary">
                  {feedback.text}
                </Typography>
                <Typography variant="caption" color="primary">
                  By {feedback.author} on {feedback.date}
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ToyDetails;
