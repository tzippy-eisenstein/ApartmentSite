import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Navigate, useBlocker } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { AddCategory } from '../redux/apiCategory';
import { AddCity } from '../redux/apiCity';
import { addApartment } from '../redux/apiApartments';
import { useAutocomplete } from '@mui/material';
import { GetAllCategory } from '../redux/apiCategory';
import { GetAllCity } from '../redux/apiCity';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const  AccountMenu =()=> {

  const [categoris,setCategoris]=useState([])
  const [citys,setCities]=useState([])

  const currentAdvertiser=useSelector(store=>store.currentAdvertiser)
  const currentClient=useSelector(store =>store.currentClient)



  useEffect(() => {
    GetAllCategory()
          .then(response => {
              setCategoris(response.data);
          })
          .catch(error => {
              console.error('Error fetching apartments:', error);
          });
  },
   []);

   useEffect(() => {
      GetAllCity()
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error fetching apartments:', error);
            });
    },
     []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  //   if(currentClient.email!='')
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'eror',
  //     text: 'its',
  // });
  //   if(currentAdvertiser.email=='')
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'eror',
  //     text: 'you need to login to able this options',
  // });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const update = () =>{
    
  }

  const handleAddCategory = () => {
    debugger
    Swal.fire({
      title: 'Add Category',
      html: `
        <form id="categoryForm">
          <label for="categoryName">Category Name:</label><br>
          <input type="text" id="categoryName" name="categoryName"><br><br>
          <button id="submitBtn" type="submit">Submit</button>
        </form>
      `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close',
     });

     document.getElementById('categoryForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const categoryName = document.getElementById('categoryName').value;

        const Category = {
            name: categoryName
        }
    debugger
        AddCategory(Category)
        
            .then(x => {
                console.log(x.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Add Category',
                    text: 'You have successfully AddCategory!',
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Login failed. Please check your credentials and try again.',
                });
            })
    });
}

window.onload = function() {
  debugger
  displayCities(); // קריאה לפונקציה כאשר הדף נטען
};

async function fetchCities() {
  debugger
  const username = 'tzippy'; // שם משתמש שלך ב-GeoNames
  const url = `http://api.geonames.org/searchJSON?country=IL&maxRows=1000&featureClass=P&orderby=population&username=tzippy`;

  try {
      const response =  fetch(url);
      const data =  response.json();
      
      // יש לטפל כאן בתשובה שקיבלת וליצור את רשימת הערים המבוקשת
      const cities = data.geonames.map(city => ({
          name: city.name,
          id: city.geonameId
      }));

      return cities;
  } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
  }
}

// פונקציה שמציגה את רשימת הערים באמצעות הוספת אפשרויות לתגית select ב-HTML
async function displayCities() {
  const cities = await fetchCities();
  const selectElement = document.getElementById('citySelect');

  cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city.id;
      option.textContent = city.name;
      selectElement.appendChild(option);
  });
}

const handleAddCity = async () => {
  const cities = await fetchCities(); // קריאה לפונקציה שמביאה את רשימת הערים
  const cityOptions = cities.map(city => `<option value="${city.id}">${city.name}</option>`).join('');

  Swal.fire({
      title: 'Add City',
      html: `
          <form id="CityForm">
              <label for="cityName">Select City:</label><br>
              <select id="cityName" name="cityName">
                  ${cityOptions}
              </select><br><br>
              <button id="submitBtn" type="submit">Submit</button>
          </form>
      `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close',
  });

  document.getElementById('CityForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const selectedCityId = document.getElementById('cityName').value;

      const City = {
          id: selectedCityId
      };

      AddCity(City)
          .then(x => {
              console.log(x.data)
              Swal.fire({
                  icon: 'success',
                  title: 'Add City',
                  text: 'You have successfully added the city!',
              });
          })
          .catch(err => {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Failed to add the city. Please try again later.',
              });
          });
  });
}

const handleAddApartment = () => {
  Swal.fire({
      title: 'Add Apartment',
      html: `
    <form id="ApartmentForm">
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name"><br><br>
  
    <label for="description">Description:</label><br>
    <input type="text" id="description" name="description"><br><br>
  
    <label for="image">Image:</label><br>
    <input type="file" id="image" name="image"><br><br>

    <label for="idCategory">Category:</label><br>
      <select id="idCategory" name="idCategory">
        ${categoris.map(category => `<option value="${category._id}">${category.name}</option>`).join('')}
      </select><br><br>
  
         <label for="cityId">City:</label><br>
      <select id="cityId" name="cityId">
        ${citys.map(city => `<option value="${city._id}">${city.name}</option>`).join('')}
      </select><br><br>
  
    <label for="address">Address:</label><br>
    <input type="text" id="address" name="address" required><br><br>
  
    <label for="numOfBad">Number of Beds:</label><br>
    <input type="number" id="numOfBad" name="numOfBad"><br><br>
  
    <label for="adition">Additions:</label><br>
    <input type="text" id="adition" name="adition"><br><br>
  
    <label for="cost">Cost:</label><br>
    <input type="number" id="cost" name="cost"><br><br>
  
    <button id="submitBtn" type="submit">Submit</button>
  </form>
    `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close',
  });
  document.getElementById('ApartmentForm').addEventListener('submit', handleApartmentFormSubmit);

}

const handleApartmentFormSubmit = async (event) => {

    // קבל את הערך שנבחר מתוך הרשימה של הקטגוריה
    const categoryId = document.getElementById('idCategory').value;

    // קבל את הערך שנבחר מתוך הרשימה של העיר
    const cityId = document.getElementById('cityId').value;

  event.preventDefault();
  debugger
  const formData = new FormData();
  formData.append('idAdvertiser', currentAdvertiser._id);
  formData.append('idCategory', categoryId); // שימוש בערך הנבחר של הקטגוריה
  formData.append('cityId', cityId); // שימוש בערך הנבחר של העיר
  formData.append('image', event.target[2].files[0]);
  formData.append('name', event.target[0].value);
  formData.append('description', event.target[1].value);
  formData.append('adition', event.target[7].value);
  formData.append('numOfBad', event.target[6].value);
  formData.append('cost', event.target[8].value);
  formData.append('address', event.target[5].value);

  axios.post(`http://localhost:3001/apartment/add/`, formData)
      .then((x) => {
          Swal.fire({
              icon: 'success',
              title: 'Add Apartment',
              text: 'Apartment added successfully!',
          });
      })
      .catch((err) => {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to add apartment. Please try again later.',
          });
      })
}

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <PersonAddAlt1OutlinedIcon style={{ fontSize: 35, color: '#AF8C53' }} 
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </PersonAddAlt1OutlinedIcon>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr:               1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={update}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
  
        <MenuItem onClick={handleAddApartment}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Add Apartment
        </MenuItem>
        <MenuItem onClick={handleAddCity}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Add city
        </MenuItem>

        <MenuItem onClick={handleAddCategory}>
          <AddCircleOutlineOutlinedIcon>
            <PersonAdd fontSize="small" />
          </AddCircleOutlineOutlinedIcon>
          Add Category
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

