import React from 'react';
import { Link } from 'react-router-dom'
import {FaMeetup} from 'react-icons/fa'

function Header() {
  return <header>
    <Link to="/" className="header-logo"><FaMeetup /></Link>
  </header>
}

export default Header;
