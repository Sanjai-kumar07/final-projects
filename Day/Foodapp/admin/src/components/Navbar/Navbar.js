import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.testo2} className='logo' alt='pic2'/>
      <div className='navbar-right-content'>
      <img src={assets.Profileimage} className='profile'alt="Avatar" />
      
      </div>
    </div>
  )
}

export default Navbar