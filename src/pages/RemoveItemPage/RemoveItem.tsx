import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';

function RemoveEditItemPage() {
  const { id } = useParams<{ id: string }>();
  const [editedToy, setEditedToy] = useState({
    id: '',
    name: '',
    price: 0,
    creationDate: '',
    color: '',
    amount: 0,
    ratingAverage: 0,
    ratingAmount: 0,
    description: '',
    warrantyPeriod: 0,
    gender: '',
    categoryId: '',
    manufacturerId: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch default data for the product
    axios
      .get(`https://localhost:7026/api/Product/GetById/${id}`)
      .then((response) => setEditedToy(response.data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleRemoveItem = async () => {
    try {
      // Make a DELETE request to remove the product
      await axios.delete(
        `https://localhost:7026/api/Product/DeleteProduct/${id}`,
      );

      // Handle success, redirect to the list page
      navigate(`/List`);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const divStyle = {
    marginBottom: '16px',
    width: '100%',
  };
  const textFieldStyle = {
    width: '300px',
    marginBottom: '16px',
  };

  if (!editedToy.id) {
    return <div>Item not found</div>;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Remove/Edit Item</Typography>
          {/*<CardMedia
            component="img"
            height="300"
            image={/* Assuming editedToy has an imageUrl property  editedToy.imageUrl}
            alt={editedToy.name}
          /> */}

          <div style={divStyle}>
            <TextField
              label="Item Name"
              value={editedToy.name}
              onChange={(e) =>
                setEditedToy({ ...editedToy, name: e.target.value })
              }
              style={textFieldStyle}
              disabled // Disable the input field for editing
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
              disabled // Disable the input field for editing
            />
          </div>

          <div style={divStyle}>
            <TextField
              label="Item Price"
              type="number"
              value={editedToy.price}
              onChange={(e) =>
                setEditedToy({
                  ...editedToy,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              style={textFieldStyle}
              disabled // Disable the input field for editing
            />
          </div>

          {/* Additional fields for editing, similar to the ones in EditProductPage */}

          <Button
            variant="contained"
            color="primary"
            onClick={handleRemoveItem}
            style={{ marginBottom: '12px', width: '300px' }}
          >
            Remove Item
          </Button>
          <Link to={`/Toys/${id}`}>
            <Button variant="contained" color="primary" fullWidth>
              Go Back
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RemoveEditItemPage;
