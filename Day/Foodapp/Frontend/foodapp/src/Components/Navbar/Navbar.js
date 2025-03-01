import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("Home");

  const {getTotalCartAmount,token,setToken} =useContext(StoreContext);

  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }

  return (
    <div className='navbar' id='Navbar'>
     <Link to='/'> <img src={assets.testo} alt='pic1' className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#aboutus' onClick={() => setMenu("About us")} className={menu === "About-us" ? "active" : ""}>About us</a>
        <a href='#footer' onClick={() => setMenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.Addtocart} alt='pic1'  className='addtocart'/></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={() =>setShowLogin(true)}>Sign in</button>
          :<div className='navbar-profile'>
             <img src={assets.profile_icon} alt='pic1'/>
             <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt='pic1'/><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt='pic1'/><p>Logout</p></li>
              <hr/>
              <li><a href="">Admin</a></li>
             </ul>
            </div>}
        
      </div>
    </div>
  )
}

export default Navbar
