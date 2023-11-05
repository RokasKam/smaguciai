import React from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function FormOrderPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Discount Code"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Shipping Address"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          minRows={3}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          component={Link} // The Button will render as a Link component
          to={`/Cart/Order/Pay`}
        >
          Place Order
        </Button>
      </form>
    </div>
  );
}

export default FormOrderPage;
