import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {getAllApartments} from'../redux/apiApartments'
import i from '../../pic/apartment.jpg';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { GetAllCategory } from '../redux/apiCategory';
import { getByIdCategory } from '../redux/apiApartments';
import {getByIdCity} from '../redux/apiApartments'
import { GetAllCity } from '../redux/apiCity';
import {getByPriceRange} from '../redux/apiApartments'
import {getByNumOfBads} from '../redux/apiApartments'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteApartment } from '../redux/apiApartments';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {getByIdClient} from '../redux/apiApartments'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Apartments = () => {
    const [apartments, setApartments] = useState([]);
    const [categoris,setCategoris] =useState([]);
    const [cities,setCities] =useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [numOfBads, setnumOfBads] = useState('');

    const currentAdvertiser=useSelector(store=>store.currentAdvertiser)
    const currentClient=useSelector(store =>store.currentClient)

    //סינונים
    const [state, setState] = React.useState({
        right: false,
      });
    
      const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ right: open });
      };

      const handleCityClick=(id)=>{
        debugger
        getByIdCity(id)
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching City:', error);
            });
      }

      const handleCategoryClick=(id)=>{
        debugger
        getByIdCategory(id)
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching apartment:', error);
            });
      }

      const handlegetByPriceRange = () => {
        debugger;
        getByPriceRange(minPrice, maxPrice)
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching apartments by price range:', error);
            });
    };

    const handlegetByNumBads = () => {
        debugger;
        getByNumOfBads(numOfBads)
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching apartments by num of bad range:', error);
            });
    };

    const handleGetYourApartment = () =>{
        debugger
        getByIdClient(currentAdvertiser._id)
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching apartments by price range:', error);
            }); 
    }
    
      const list = () => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
        </Box>
      );
      
    //בעת טעינה
    useEffect(() => {
        getAllApartments()
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching categoris:', error);
            });
    },
     []);

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

    //    כפתור עדכון ומחיקה
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (id, idAdvertiser) => {
    debugger
    deleteApartment(id, idAdvertiser)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Deleted Successfully',
                text: 'The apartment has been successfully deleted!',
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Deletion Failed',
                text: 'you can delete only yours apartment.',
            });
            console.error('Error fetching apartments:', error);
        });
}
// עדכון דירה
const handleUpdate = (id,name,description,address,numOfBad,adition,cost) => {
    debugger
    Swal.fire({
        title: ' Apupdate artment',
        html: `
        <form id="ApartmentForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${name}" class="swal2-input"><br><br>
      
        <label for="decreption">Description:</label>
        <input type="text" id="decreption" name="decreption" value="${description}" class="swal2-input"><br><br>
      
        <label for="address">Address:</label>
        <input type="text" id="address" name="address" required class="swal2-input" value="${address}" ><br><br>
      
        <label for="numberBed">Number of Beds:</label>
        <input type="number" id="numberBed" name="numberBed"   value="${numOfBad}" ><br><br>
      
        <label for="addition">Additions:</label><br><br>
        <input type="text" id="addition" name="addition"  value="${adition}"  ><br><br>
      
        <label for="price">Cost:</label><br><br>
        <input type="number" id="price" name="price" class="swal2-input" value="${cost}" ><br><br>
      
        <button id="submitBtn" type="submit">Submit</button>
  
      </form>
      `,

            /*
      <label for="image">Image:</label>
      <input type="file" id="image" name="image" value=${image} class="swal2-input"><br><br>
      */
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Close',
    });
    document.getElementById('ApartmentForm').addEventListener('submit', (event) => handleApartmentFormSubmit(event,id));
}

const handleApartmentFormSubmit = async (event,id) => {
    event.preventDefault();
    debugger

    const apartment = {
      name: event.target.name.value,
      description: event.target.decreption.value,
      adition: event.target.addition.value,
      numOfBad: event.target.numberBed.value,
      cost: event.target.price.value,
      address: event.target.address.value
  }
    const token =localStorage.getItem('token')
    axios.patch(`http://localhost:3001/apartment/update/${currentAdvertiser._id}/${id}`, 
    apartment, 
    { headers: { 'Authorization': token } })
        .then((x) => {
            Swal.fire({
                icon: 'success',
                title: 'Update Apartment',
                text: `Apartment ${x.data.name} update successfully!`,
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.message,
            });
        })
}
    return (<>
    
    <div>
      <React.Fragment key={'right'}>
      <ListItem style={{backgroundColor:'#252926'}}>
  <MenuOutlinedIcon
    edge="start"
    color="inherit"
    aria-label="menu"
    onClick={toggleDrawer(true)}
    sx={{ color: '#AF8C53', fontSize: 55 }} 
  >
    <MenuOutlinedIcon style={{fontSize: 50}}/>
  </MenuOutlinedIcon>
</ListItem>
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer(false)} >
          {list()}
<List>
  <Typography variant="h6" textAlign={'center'} color={'#AF8C53'}>- - - Custom filters - - -</Typography>
  <Box sx={{ mt: 3, mb: 0.2, ml: 2, mr: 2 }}>
    <FormControl fullWidth>
      <InputLabel>בחר קטגוריה</InputLabel>
      <Select onChange={(e) => handleCategoryClick(e.target.value)}>
        <MenuItem value="">בחר קטגוריה</MenuItem>
        {categoris.map(category => (
          <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
</List>

<List>
  <Box sx={{ mt: 0, mb: 3.5, ml: 2, mr: 2 }}> {/* מרווחים מתאימים מעל, מתחת, מימין ומשמאל */}
    <FormControl fullWidth>
      <InputLabel>בחר עיר</InputLabel>
      <Select onChange={(e) => handleCityClick(e.target.value)}>
        <MenuItem value="">בחר עיר</MenuItem>
        {cities.map(city => (
          <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
  <Divider />
</List>

<List>
  <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}> {/* מרווחים מתאימים מעל, מתחת, מימין ומשמאל */}
    <ListItem>
      <TextField
        label="מחיר מינימלי"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        fullWidth
      />
    </ListItem>
    <ListItem>
      <TextField
        label="מחיר מקסימלי"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        fullWidth
      />
    </ListItem>
    <ListItem>
      <Button style={{color:'#AF8C53'}} onClick={handlegetByPriceRange}>סנן לפי מחיר</Button>
    </ListItem>
  </Box>
  <Divider />
</List>

<List>
  <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}> {/* מרווחים מתאימים מעל, מתחת, מימין ומשמאל */}
    <ListItem>
      <TextField
        label="מספר מיטות"
        type="number"
        value={numOfBads}
        onChange={(e) => setnumOfBads(e.target.value)}
        fullWidth
      />
    </ListItem>
    <ListItem>
      <Button style={{color:'#AF8C53'}} onClick={handlegetByNumBads}>סנן לפי מספר מיטות</Button>
    </ListItem>
  </Box>
  <Divider />
</List>
<Box sx={{ mt: 0.5, mb: 2, ml: 2, mr: 2 }}>
   <List>
  <ListItem>
     <Button style={{color:'#AF8C53'}} onClick={handleGetYourApartment}>קבל רק את הדירות שלך</Button>
    </ListItem>

  </List>
</Box>
</Drawer>
      </React.Fragment>


      {/* ------------------הצגת הדירות------------------------ */}
    </div>
        <div style={{ backgroundColor: '#252926', padding: '1rem' }}>       
            <Typography variant="h4" align="center" style={{ color: '#AF8C53', marginBottom: '1rem' }}>Properties for Sale</Typography>
            <image src={`http://localhost:3001/uploads/1707913572682-1.jpg`}></image>
            <Grid container spacing={4}>
                {apartments.map(apartment => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={apartment.id}>
                        <Card style={{ backgroundColor: '#252926', boxShadow: 'none', margin: '0.5rem' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                src={`http://localhost:3001/${apartment.image}`}
                                // src={i}

                                alt={apartment.name}
                                style={{ objectFit: 'cover', borderRadius: '8px 8px 0 0', width: '100%' }}
                            />
                            <div style={{ height: '2px', backgroundColor: '#AF8C53' ,margin: '8px 0'}}></div> {/* שינוי בשולים */}
                            <CardContent style={{ padding: '1rem', textAlign: 'center' }}>
                                  {/*  */}
              <div style={{ position: 'relative', marginBottom: '1rem' ,marginLeft:'-2rem',marginTop:'-rem' }}>
                
    <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ position: 'absolute', top: '0', left: '0' }}
    >
        <MoreVertIcon style={{color:'#AF8C53'}} />
    </Button>
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <MenuItem onClick={() => handleDelete(apartment._id, currentAdvertiser._id)}>Delete</MenuItem>
        <MenuItem onClick={() => handleUpdate(apartment._id,apartment.name,apartment.description,apartment.address,apartment.numOfBad,apartment.adition,apartment.cost)}>Update</MenuItem>
    </Menu>
</div>
                               {apartment.idCategory &&
                                      <Typography variant="h7" color="text.secondary" style={{ color: '#AF8C53'}}>

                                     {apartment.idCategory.name}
                                     </Typography>}
                                {/* <Typography variant="h7" color="text.secondary" style={{ color: '#AF8C53'}}>
                                    {apartment.name}
                                </Typography> */}
                                <br></br>
                                <Typography variant="body2" color="text.secondary" style={{ color: '#AF8C53'}}>
                                   {apartment.cost}$ |  Location: {apartment.address} | {apartment.numOfBad} Bads
                                </Typography>
                                
                                <br></br>
                                <Typography variant="body2" color="text.secondary" style={{ color: '#AF8C53'}}>
                                        Details of the owner apartment :
                                     </Typography>
                                     {apartment.idAdvertiser &&
                                      <Typography variant="body2" color="text.secondary" style={{ color: '#AF8C53'}}>
                                      
                                     {apartment.idAdvertiser.email} | {apartment.idAdvertiser.phone}

                                     </Typography>}
                               <div style={{ height: '1px', backgroundColor: '#AF8C53' ,margin: '8px 0'}}></div> 
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
        </>
    );
};

export default Apartments;
