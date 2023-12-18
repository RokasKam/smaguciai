import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import { Category, Manufacturer } from '../../Interfaces/Options';
import { useNavigate } from 'react-router-dom';
interface PhotoData {
  url: string;
  alterText: string;
  productId: string;
}
function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemColor, setItemColor] = useState('');
  const [itemAmount, setItemAmount] = useState(0);
  const [itemWarrantyPeriod, setItemWarrantyPeriod] = useState(0);
  const [itemGender, setItemGender] = useState('');
  const [itemCategoryId, setItemCategoryId] = useState('');
  const [itemManufacturerId, setItemManufacturerId] = useState('');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const genders = ['Man', 'Women', 'Unisex'];
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loadingSnackbar, setLoadingSnackbar] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          'https://localhost:7026/api/Category/GetAll',
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Fetch manufacturers from the API
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get<Manufacturer[]>(
          'https://localhost:7026/api/Manufacturer/GetAll',
        );
        setManufacturers(response.data);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };

    fetchCategories();
    fetchManufacturers();
  }, []); // Run once on component mount

  const handleAddItem = async () => {
    if (
      !itemName ||
      !itemDescription ||
      itemPrice <= 0 ||
      itemAmount <= 0 ||
      !itemColor ||
      itemWarrantyPeriod <= 0 ||
      !itemGender ||
      !itemManufacturerId ||
      !itemCategoryId
    ) {
      setSnackbarMessage('Please fill in all required fields.');
      setOpenSnackbar(true);
      return;
    }
    try {
      setLoadingSnackbar(true);
      // Prepare the request payload for adding a new product
      const newItem = {
        name: itemName,
        price: itemPrice,
        creationDate: new Date().toISOString(),
        color: itemColor,
        amount: itemAmount,
        description: itemDescription,
        warrantyPeriod: itemWarrantyPeriod,
        gender: itemGender,
        categoryId: itemCategoryId,
        manufacturerId: itemManufacturerId,
      };

      // Make a POST request to add a new product
      const response = await axios.post(
        'https://localhost:7026/api/Product/AddNewProduct',
        newItem,
      );

      // Handle the response as needed
      console.log('New item added:', response.data);

      // Upload images for the newly added product
      if (response.data && imageFiles) {
        const productId = response.data;
        await uploadImages(productId);
      }

      // Redirect to the list page
      setSnackbarMessage('Item and photos added successfully.');
      setOpenSnackbar(true);
      navigate(`/List`);
    } catch (error) {
      setSnackbarMessage('Unable to add item or photos');
      setOpenSnackbar(true);
      console.error('Error adding item:', error);
    }
  };

  const uploadImages = async (productId: string) => {
    try {
      for (let i = 0; i < imageFiles!.length; i++) {
        const file = imageFiles!.item(i);
        if (file) {
          const photoData: PhotoData = {
            url: await convertFileToBase64(file),
            alterText: `Product Photo ${i + 1}`,
            productId: productId,
          };
          console.log(photoData);
          // Make a POST request to add a new photo
          const response = await axios.post(
            'https://localhost:7026/api/Photo/AddNewPhoto',
            photoData,
          );

          // Check if the request was successful (status code 2xx)
          if (response.status >= 200 && response.status < 300) {
            console.log(`Photo ${i + 1} uploaded successfully`);
          } else {
            console.error(
              `Error uploading photo ${i + 1}: ${response.statusText}`,
            );
          }
        }
      }

      setSnackbarMessage('Item and photos added successfully.');
      setOpenSnackbar(true);
      navigate(`/List`);
    } catch (error) {
      setSnackbarMessage('Unable to add item or photos');
      setOpenSnackbar(true);
      console.error('Error adding item:', error);
    } finally {
      setLoadingSnackbar(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject('Failed to convert file to base64');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(e.target.files);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const divStyle = {
    marginBottom: '16px',
    width: '100%',
  };

  const textFieldStyle = {
    width: '300px',
    marginBottom: '16px',
  };
  return (
    <>
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
                inputProps={{
                  step: 0.01,
                }}
                onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                style={textFieldStyle}
              />
            </div>

            <div style={divStyle}>
              <TextField
                label="Item Color"
                value={itemColor}
                onChange={(e) => setItemColor(e.target.value)}
                style={textFieldStyle}
              />
            </div>

            <div style={divStyle}>
              <TextField
                label="Item Amount"
                type="number"
                value={itemAmount}
                onChange={(e) => setItemAmount(parseInt(e.target.value) || 0)}
                style={textFieldStyle}
              />
            </div>

            <div style={divStyle}>
              <TextField
                label="Item Warranty Period"
                type="number"
                value={itemWarrantyPeriod}
                onChange={(e) =>
                  setItemWarrantyPeriod(parseInt(e.target.value) || 0)
                }
                style={textFieldStyle}
              />
            </div>

            <div style={divStyle}>
              <InputLabel id="gender-label">Item Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={itemGender}
                onChange={(e) => setItemGender(e.target.value as string)}
                style={textFieldStyle}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div style={divStyle}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={itemCategoryId}
                onChange={(e) => setItemCategoryId(e.target.value)}
                style={textFieldStyle}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div style={divStyle}>
              <InputLabel id="manufacturer-label">Manufacturer</InputLabel>
              <Select
                labelId="manufacturer-label"
                id="manufacturer"
                value={itemManufacturerId}
                onChange={(e) => setItemManufacturerId(e.target.value)}
                style={textFieldStyle}
              >
                {manufacturers.map((manufacturer) => (
                  <MenuItem key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={divStyle}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
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
      <Snackbar
        open={loadingSnackbar}
        autoHideDuration={6000}
        message="Adding item..."
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default AddItemPage;
