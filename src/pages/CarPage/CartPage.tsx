import React from 'react';
import { useCart } from '../../Context/CartContext';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import { Toy } from '../../Interfaces/Toy';
import MenuBar from '../../Components/MenuBar/MenuBar';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, addToCart } = useCart();
  const handleRemoveItem = (item: Toy) => {
    removeFromCart(item);
  };

  const handleIncrement = (item: Toy, quantity: number) => {
    addToCart(item, quantity + 1);
  };

  const handleDecrement = (item: Toy, quantity: number) => {
    if (quantity > 1) {
      addToCart(item, quantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  return (
    <div>
      <MenuBar />
      <Typography variant="h4" gutterBottom>
        Cart Page
      </Typography>
      <List>
        {cart.map((cartItem) => (
          <ListItem key={cartItem.item.id}>
            <ListItemText primary={cartItem.item.name} />
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    handleDecrement(cartItem.item, cartItem.quantity)
                  }
                >
                  -
                </Button>
              </Grid>
              <Grid item>
                <TextField type="number" value={cartItem.quantity} />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    handleIncrement(cartItem.item, cartItem.quantity)
                  }
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleRemoveItem(cartItem.item)}
                color="secondary"
              >
                <RemoveCircle />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        component={Link} // The Button will render as a Link component
        to={`/Cart/Order`}
      >
        Place Order
      </Button>
    </div>
  );
}

export default CartPage;
