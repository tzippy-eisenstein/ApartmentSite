import { NavLink, useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
import "./home.css"; // קובץ עם הגדרות CSS
import { Register } from "../Register/Register";
import { Clients } from "../Clients/Clients";
import { Contact } from "../Contact/Contact";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Apartments } from "../Apartments/Apartments";

export const Home = () => {
       const navigate = useNavigate()

    const login = () => {
        navigate(`/loginSection`)
    };
    const register = () => {
        navigate(`/registerSection`)
    };
    
    return (
        <>
            <div className="home-container">
                <h1 className="feigi"></h1>
                <div className="button-container">
                    <Button style={{ backgroundColor: '#AF8C53', color: 'black', width: '10000%', }} variant="contained" onClick={() => login()}>Login</Button>
                    <Button style={{ color: '#AF8C53', borderColor: '#AF8C53', width: '10000%' }} variant="outlined" onClick={() => register()}> register</Button>
                </div>
            </div>
      
        </>
    );
}
