import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {loading,user,isAuthenticated}=useAuth();
    const navigate=useNavigate();
  return (
    <div>Navbar</div>
  )
}

export default Navbar