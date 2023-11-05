import React from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function PaymentPage() {
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing logic here
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <TextField
        label="Card Number"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Expiration Date"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField label="CVV" variant="outlined" fullWidth margin="normal" />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        component={Link} // The Button will render as a Link component
        to={`/`}
      >
        Pay
      </Button>
    </form>
  );
}

export default PaymentPage;
