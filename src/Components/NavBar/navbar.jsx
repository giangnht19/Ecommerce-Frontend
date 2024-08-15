import React, { useContext, useState } from 'react';
import './navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="nav-logo" onClick={() => { setMenu("shop") }}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
        <p className="nav-logo" onClick={() => { setMenu("shop") }}><Link to='/'>FashFRENZY</Link></p>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
        <li className={menu === "shop" ? "active" : ""} onClick={() => { setMenu("shop"); toggleMenu(); }}>
          <Link to='/'>Shop</Link>
        </li>
        <li className={menu === "mens" ? "active" : ""} onClick={() => { setMenu("mens"); toggleMenu(); }}>
          <Link to='/mens'>Men</Link>
        </li>
        <li className={menu === "womens" ? "active" : ""} onClick={() => { setMenu("womens"); toggleMenu(); }}>
          <Link to='/womens'>Women</Link>
        </li>
        <li className={menu === "kids" ? "active" : ""} onClick={() => { setMenu("kids"); toggleMenu(); }}>
          <Link to='/kids'>Kids</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <div style={{ position: 'relative' }}>
          <Link to='/cart'><img src={cart_icon} alt="cart_icon" /></Link>
          <div className="nav-cart-count" data-count={getTotalCartItems()}></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
