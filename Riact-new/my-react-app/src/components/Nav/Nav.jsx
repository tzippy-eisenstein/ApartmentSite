import { useSelector } from 'react-redux'
// import './style.css'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'

export const Nav = () => {
    debugger
    return <>
        <div className={'nav'}>
            <NavLink to='Home' className={'link'}>Home</NavLink>
            <NavLink to='Login' className={'link'}>Login</NavLink>
            <NavLink to='Contact' className={'link'}>contact</NavLink>
        </div>

        {/*         <div className={'nav'}>
            <NavLink to='Home' className={'link'}>Home</NavLink>
            <NavLink to='Recipes' className={'link'}>Recipes</NavLink>
            <NavLink to='SignIn' className={'link'}>SignIn</NavLink>
            <NavLink id='right' to='LogIn' className={'link'}>Log In</NavLink>
            {name.firstName != 'Annonymous' && name.email != Manager.email && <NavLink  to='personalArea' className={'link'} >{name.firstName}</NavLink>}
            {name.email == Manager.email && <NavLink to='Manager' className={'link'}>Manager</NavLink>}
        </div> */}
    </>

    
}

