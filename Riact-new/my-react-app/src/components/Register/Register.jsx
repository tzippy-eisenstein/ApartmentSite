
import "./Register.css"; // קובץ עם הגדרות CSS
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import swal from "sweetalert"
import { registerClient } from "../redux/apiClients";
import { registeAdvertiser } from "../redux/apiAdvertiser";
import Swal from "sweetalert2";
import { setCurrentAdvertiser } from "../redux/Action";

export const Register = () => {

  const dispatch = useDispatch()
  const nav = useNavigate()
 

  const send = (event) => {
    debugger
      event.preventDefault()

      const Advertiser = {
        email: event.target[0].value,
        password: event.target[1].value,
        phone: event.target[2].value,
        aditionPhone: event.target[3].value
      }

       registeAdvertiser (Advertiser)
                .then(x => {
                    console.log(x.data)
                       dispatch( setCurrentAdvertiser(x.data.user))
                       alert(x.data.user.email)
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Client Successful',
                        text: 'You have successfully register in!',
                    });
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Login failed. Please check your credentials and try again.',
                    });
                })
    }
    
    return <>
    <div className="Register-container">
    <br></br>
        <br></br>
        <form className='formSignIn' onSubmit={(e) => send(e)}>
            <p className='pSignIn' type="first Name">
                <input className='inputRegister' id={'email'} placeholder={'email'} email="usrnm"></input>
            </p>
            <p className='pSignIn' type="password">
                <input className='inputRegister' id={'password'} placeholder={'password'} ></input>
            </p>
            <p className='pSignIn' type="phone">
                <input className='inputRegister' id={'phone'} placeholder={'phone'}></input>
            </p>
            <p className='pSignIn' type="aditionPhone">
                <input className='inputRegister' id="aditionPhone" type="aditionPhone" placeholder="aditionPhone"></input>
            </p>
            <button className='btnRegister' type="submit" value={'send'}>Register</button>
            <div className='spanRegister'>
                <span className="fa fa-phone"></span>077-326451
                <span className="fa fa-envelope-o"></span> 98*
            </div>
            <br></br>
        </form>
      </div>
          
    </>
}
