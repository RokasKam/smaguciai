import React from 'react';
import MenuBar from '../../Components/MenuBar/MenuBar';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toysData } from '../../toysData';

function ListOfItems() {
  return (
    <div>
      <MenuBar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button component={Link} to="/AddItem" variant="contained" color="primary">
          Add Item
        </Button>
        </div>
      <Container>
        <Grid container spacing={2}>
          {Object.values(toysData).map((toy) => (
            <Grid item xs={12} sm={6} md={4} key={toy.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={toy.imageUrl}
                  alt={toy.name}
                />
                <CardContent>
                  <Typography variant="h6">{toy.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {toy.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {toy.price}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/Toys/${toy.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 8 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ListOfItems;
