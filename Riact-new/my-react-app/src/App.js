import React from 'react';
import store from './components/redux/store';
import { Home } from './components/Home/Home';
import { MainNav } from './components/Nav/MainNav';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // שימוש ב- Link מ- react-router-dom במקום ScrollLink
import { Provider } from "react-redux"
import { Home as HomeIcon, Phone as PhoneIcon, Apartment as ApartmentIcon } from '@mui/icons-material';
import "./App.css"; // קובץ עם הגדרות CSS
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
// import { AccountMenu } from './components/Apartments/personalOptions/options';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import Apartments from './components/Apartments/Apartments';
import { Clients } from './components/Clients/Clients';
import { Contact } from './components/Contact/Contact';
import { AccountMenu } from './components/personalOptions/options';
import { Nav } from './components/Nav/Nav';

function App() {
   return (
      <Provider store={store}>
         <Router>
            <nav className="main-nav">
               <Link to='/home'>
                  <CottageOutlinedIcon style={{ fontSize: 30, color: '#AF8C53', display: 'inline-block' }}></CottageOutlinedIcon>
               </Link>
      
               <Link to='#contactSection'>
                  <ContactMailOutlinedIcon style={{ fontSize: 30, color: '#AF8C53' }} />
               </Link>
               
               <Link to='/apartments'>
                  <ApartmentIcon style={{ fontSize: 30, color: '#AF8C53' }} />
               </Link>
               <AccountMenu />
            </nav>
            {/* <Nav></Nav> */}
            <Home />
            <Login id="loginSection"></Login>
            <Register id="registerSection"></Register>
            <Apartments id="apartmentSection"></Apartments>
            <Clients id="clientSection"></Clients>
            <Contact id="contactSection"></Contact>
         </Router>
       </Provider>
    );
}

export default App;
