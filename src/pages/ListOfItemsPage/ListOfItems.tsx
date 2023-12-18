import React, { useEffect, useState } from 'react';
import MenuBar from '../../Components/MenuBar/MenuBar';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem, // Import MenuItem for dropdowns
  Select,
  TextField,
  Snackbar, // Import Select for dropdowns
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Toy } from '../../Interfaces/Toy';
import axios from 'axios';
import { Category, Manufacturer } from '../../Interfaces/Options';
import { useUserContext } from '../../Context/UserContext';
enum Orderby {
  PriceAcending,
  PriceDescending,
  RatingAcending,
  RatingDescending,
}

function ListOfItems() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<
    string | null
  >('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<Orderby>(
    Orderby.PriceAcending,
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { user } = useUserContext();
  useEffect(() => {
    if (
      (minPrice !== null && minPrice < 0) ||
      (maxPrice !== null && maxPrice < 0) ||
      (minPrice !== null && maxPrice !== null && maxPrice < minPrice)
    ) {
      setSnackbarMessage(
        'Invalid price range. Please make sure the prices are valid.',
      );
      setOpenSnackbar(true);
    }
  }, [minPrice, maxPrice]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    // Fetch the list of categories
    axios
      .get('https://localhost:7026/api/Category/GetAll')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch the list of manufacturers
    axios
      .get('https://localhost:7026/api/Manufacturer/GetAll')
      .then((response) => setManufacturers(response.data))
      .catch((error) => console.error('Error fetching manufacturers:', error));
  }, []);

  useEffect(() => {
    const getAllToysParameters = {
      orderby: selectedSort,
      categoryid: selectedCategory,
      manufacturerid: selectedManufacturer,
      priceFrom: minPrice,
      priceTo: maxPrice,
      gender: selectedGender || null,
      pageNumber: 1,
      pageSize: 20,
    };

    axios
      .get<Toy[]>('https://localhost:7026/api/Product/GetAll', {
        params: getAllToysParameters,
      })
      .then((response) => {
        console.log('API Response:', response.data); // Log the response data
        setToys(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [
    selectedCategory,
    selectedGender,
    selectedManufacturer,
    minPrice,
    maxPrice,
    selectedSort,
  ]);

  return (
    <div>
      <MenuBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        {/* Category Dropdown */}
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as string)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Category' }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        {/* Gender Dropdown */}
        <Select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value as string)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Gender' }}
        >
          <MenuItem value="">All Genders</MenuItem>
          <MenuItem value="Man">Man</MenuItem>
          <MenuItem value="Women">Women</MenuItem>
          <MenuItem value="Unisex">Unisex</MenuItem>
        </Select>

        {/* Manufacturer Dropdown */}
        <Select
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value as string)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Manufacturer' }}
        >
          <MenuItem value="">All Manufacturers</MenuItem>
          {manufacturers.map((manufacturer) => (
            <MenuItem key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </MenuItem>
          ))}
        </Select>
        {/* Min Price TextField */}
        <TextField
          label="Min Price"
          type="number"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(parseFloat(e.target.value) || null)}
          style={{ marginLeft: '8px', marginRight: '8px' }}
        />

        {/* Max Price TextField */}
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value) || null)}
          style={{ marginLeft: '8px', marginRight: '8px' }}
        />
        <Select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value as Orderby)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Sort Order' }}
        >
          <MenuItem value={Orderby.PriceAcending}>Price Ascending</MenuItem>
          <MenuItem value={Orderby.PriceDescending}>Price Descending</MenuItem>
          <MenuItem value={Orderby.RatingAcending}>Rating Ascending</MenuItem>
          <MenuItem value={Orderby.RatingDescending}>
            Rating Descending
          </MenuItem>
        </Select>
        {user?.Role === 'Admin' && (
          <Button
            component={Link}
            to="/AddItem"
            variant="contained"
            color="primary"
          >
            Add Item
          </Button>
        )}
      </div>
      <Container>
        <Grid container spacing={2}>
          {Object.values(toys).map((toy) => (
            <Grid item xs={12} sm={6} md={4} key={toy.id}>
              <Card>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default ListOfItems;
