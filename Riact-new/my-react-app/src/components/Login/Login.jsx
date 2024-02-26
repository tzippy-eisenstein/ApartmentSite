
import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import {  LoginClient } from "../redux/apiClients"; // ייבוא פונקצית הקריאה לשרת
import { useState } from "react"
import { setCurrentAdvertiser, setCurrentClient, } from '../redux/Action';
import Checkbox from '@mui/material/Checkbox';
import { store } from '../redux/store';
import { useDispatch } from 'react-redux';
import "./Login.css"; // קובץ עם הגדרות CSS
import { LoginAdvertiser } from '../redux/apiAdvertiser';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { forgetPassword } from '../redux/apiAdvertiser';
import { getAll } from '../redux/apiAdvertiser';



export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState()
    const [newUser, setNewUser] = useState()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [check, setCheck] = useState(true)
    const [num,setNum]=useState()
    const [users,setUsers]=useState([]);
    

    const currentAdvertiser=useSelector(store=>store.currentAdvertiser)
    const currentClient=useSelector(store =>store.currentClient)

    const nav = useNavigate()
    const dispatch=useDispatch()

    const handleForget = async () => {
        debugger;
        try {
            const response = await forgetPassword(newUser.email);
            const retrievedCode = response.data;
            setNum(retrievedCode);
    
            Swal.fire({
                icon: 'success',
                title: 'Login Client Successful',
                text: 'You have successfully logged in!',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Login failed. Please check your credentials and try again.',
            });
        }
        
        Swal.fire({
            title: 'password',
            html: `
                <form id="passwordFrom">
                    <label for="newPass">password:</label><br>
                    <input type="text" id="newPass" name="newPass"><br><br>
                    <button id="submitBtn" type="submit">Submit</button>
                </form>
            `,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Close',
        });
      
        document.getElementById('passwordFrom').addEventListener('submit', (event) => {
            event.preventDefault();
    
            const newPass = document.getElementById('newPass').value;
            if(newPass == num){
                alert("good");
            }
        });
    };
    
    
    const handleLogin = (event) => {
        debugger
        if (!check) {
            event.preventDefault()
            LoginClient(newUser.email, newUser.password)
                .then(x => {
                    console.log(x.data)
                       dispatch( setCurrentClient(x.data.user))
                    //    alert(x.data.user.email)
                
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Client Successful',
                        text: 'You have successfully logged in!',
                    });
                 

                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Login failed. Please check your credentials and try again.',
                    });
                })
                .finally(() => {
                    // אחרי שהפעולה הושלמה, אפשר לגשת למשתנה currentAdvertiser
                //    alert(currentAdvertiser);
                });
        }
        else {
            event.preventDefault()
            LoginAdvertiser(newUser.email, newUser.password)
                .then(x => {
                    dispatch(setCurrentAdvertiser(x.data.advertiser))
                    alert(x.data.advertiser.email)

                    localStorage.setItem('token',x.data.token)
                    localStorage.setItem('CurrentAdvertiser',JSON.stringify( x.data.advertiser))
                    console.log(x.data)
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Login advertiser Successful',
                        text: 'You have successfully logged in!',
                    });
                     
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Login failed. Please check your credentials and try again.',
                    });
                })

                .finally(() => {
                    // אחרי שהפעולה הושלמה, אפשר לגשת למשתנה currentAdvertiser
                //    alert(currentAdvertiser._id);
                });
        }
    };
    return (
        <div className="login-container">
            <div className="form-container">
                <form className='login-form' onSubmit={handleLogin}>
                    <h3>Welcome back</h3>
                    <h5>Are you an advertiser?</h5>
                    <Checkbox
                        {...label} defaultChecked color="default"
                        onChange={(e) => setCheck(e.target.checked)}
                    />
                    <TextField
                        id='email'
                        label='Email'
                        variant='outlined'
                        className='input-register'
                        placeholder='Enter your email'
                        fullWidth
                        margin='normal'
                        value={email}
                        onBlur={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <TextField
                        id='password'
                        type='password'
                        label='Password'
                        variant='outlined'
                        className='input-register'
                        placeholder='Enter your password'
                        fullWidth
                        margin='normal'
                        value={password}
                        onBlur={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                    <Button
                        type="submit"
                        style={{ backgroundColor: '#AF8C53', color: 'black', width: '35%', marginTop: '20px' }}
                        variant='contained'
                        className='btn-register'
                    >
                        Continue
                    </Button>
                </form>
                <button className="forget-password" onClick={handleForget}>Forget Password</button>
                {/* <h4 className="registration-message"> You don't have an account yet ?</h4>
                <p className="registration-message">Register now and enjoy a stock of profitable benefits!!</p>
                <Button variant="text" className="blue-text" onClick={() => nav('/register')}>Register</Button>"" */}
            </div>
        </div>
    );
};