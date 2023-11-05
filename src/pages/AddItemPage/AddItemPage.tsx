import React, { useState } from 'react';

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';

function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState(0);

  const handleAddItem = () => {
    if (itemName && itemDescription && itemPrice > 0) {
      // Create a toy object with the entered details
      const toy = {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
      };

    }
  };
  const handleAddImage = () => {

  };
  const divStyle = {
    marginBottom: '16px',
    width: '100%', // Set a specific width for uniformity
  };
  const textFieldStyle = {
    width: '300px', // Set a specific width of 300 pixels
    marginBottom: '16px',
  };

  return (
    <Container>
      <Card>
        <CardContent>
        <Typography variant="h4">Add New Item</Typography>

<div style={divStyle}>
  <TextField
    label="Item Name"
    value={itemName}
    onChange={(e) => setItemName(e.target.value)}
    style={textFieldStyle}
  />
</div>

<div style={divStyle}>
  <TextField
    label="Item Description"
    multiline
    rows={4}
    value={itemDescription}
    onChange={(e) => setItemDescription(e.target.value)}
    style={textFieldStyle}
  />
</div>

<div style={divStyle}>
  <TextField
    label="Item Price"
    type="number"
    value={itemPrice}
    onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
    style={textFieldStyle}
  />
</div>
    <Button
        variant="contained"
        color="secondary"
        onClick={handleAddImage}
         style={{ marginBottom: '12px', width: '300px'}}
        >
        Add Image
    </Button>
    <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddItem}
        >
        Add Item
    </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddItemPage;