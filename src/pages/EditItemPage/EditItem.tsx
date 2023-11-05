import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CardMedia,
  Grid,
} from '@mui/material';
import { toysData } from '../../toysData';

function EditItemPage() {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ?? '-1';
  const toy = toysData[parseInt(parsedId, 10)];

  const [editedToy, setEditedToy] = useState({
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    if (toy) {
      setEditedToy({
        name: toy.name,
        description: toy.description,
        price: parseFloat(toy.price),
      });
    }
  }, [toy]);

  const handleAddItem = () => {
    if (editedToy.name && editedToy.description && editedToy.price > 0) {
      // Handle saving the updated data here.
    }
  };

  const handleAddImage = () => {
    // Implement the logic for adding an image here.
  };

  if (!toy) {
    return <div>Toy not found</div>;
  }

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
          <Typography variant="h4">Edit Item</Typography>
          <CardMedia
            component="img"
            height="300"
            image={toy.imageUrl}
            alt={toy.name}
          />

          <div style={divStyle}>
            <TextField
              label="Item Name"
              value={editedToy.name}
              onChange={(e) => setEditedToy({ ...editedToy, name: e.target.value })}
              style={textFieldStyle}
            />
          </div>

          <div style={divStyle}>
            <TextField
              label="Item Description"
              multiline
              rows={4}
              value={editedToy.description}
              onChange={(e) =>
                setEditedToy({ ...editedToy, description: e.target.value })
              }
              style={textFieldStyle}
            />
          </div>

          <div style={divStyle}>
            <TextField
              label="Item Price"
              type="number"
              value={editedToy.price}
              onChange={(e) =>
                setEditedToy({ ...editedToy, price: parseFloat(e.target.value) || 0 })
              }
              style={textFieldStyle}
            />
          </div>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddImage}
            style={{ marginBottom: '12px', width: '300px' }}
          >
            Add Image
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddItem}
          >
            Edit Item
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EditItemPage;