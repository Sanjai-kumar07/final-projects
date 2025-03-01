import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    
    
   
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.testo} alt='pic1' style={{height: "35px"}}/>
                <p>Testo comes with 3 ready to use stunning menu layouts. Create a remarkable menu for your establishment without being a professional designer</p>
                <div className='footer-social-icons'>
                    <a href='https://www.facebook.com/login.php/?lang=en-US'><img src={assets.facebook_icon} alt='pic'/></a>
                    <a href='https://x.com/i/flow/login'><img src={assets.twitter_icon} alt='pic'/></a>
                    <a href='https://www.linkedin.com/signup'><img src={assets.linkedin_icon} alt='pic'/></a>
                </div>
            </div>
            <div className='footer-content-center'>
                 <h2>COMPANY</h2>
                 <ul>
                    <a href='#Navbar'><li>Home</li></a>
                    <a href='#explore-menu'><li>Explore Menu</li></a>
                    <a href='#aboutus' ><li>About us</li></a>
                    <a href='#'><li>Private Policy</li></a>
                    
                 </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8838090966</li>
                    <li>testo123@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 @ Testo.com - All Right Reserved </p>
    </div>
  )
}

export default Footer