import React from 'react'
import logo from '../assets/user.webp'
const NavBar = () => {
  return (
    <div className='navBar'>
        <div className="left-nav">
            <h1>MyChoice.</h1>
            <h3>Admin Panel</h3>
        </div>
        <div className="right-nav">
            <img src={logo}/>
        </div>
    </div>
  )
}

export default NavBar