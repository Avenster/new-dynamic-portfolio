import React, { useEffect, useState,useContext  } from 'react';
import '../css/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user info from localStorage and reset user state
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/');
  };

  return (
    <div className='nav'>
      <div className='bg-nav'></div>
      <div className='nav-left'>
        <span id='logo-1'>
          <img className='logo1' src="logo1.svg" alt="" />
          <Link id='n' to="/">NebulaAI</Link>
        </span>
      </div>
      <div className='nav-right'>
        <span className='n' ><Link id='n' to="/">Home</Link></span>
        <a className='n' href="https://avenster.codes/">Owner</a>
        {!user ? (
          <>
            <span className='n'>
              <Link id='n' to="/SignUp">New Account</Link>
            </span>
            <span className='btn-n'>
              <Link className='n1' to="/login">Log In</Link>
              <div className='cor'></div>
            </span>
          </>
        ) : (
          <>
            <span className='n'>Hello, {user.name}</span>
            <span className='btn-n'>
              <button style={{display:"flex", height:"6vh", width:"100%",fontFamily:"Source Code pro,monospace", justifyContent:"center",alignItems:"center"}}className='n1' onClick={handleLogout}>Log Out</button>
              <div className='cor'></div>
            </span>
          </>
        )}
      </div>
    </div>
  );
}