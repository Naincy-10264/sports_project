// frontend/src/components/Header.js (Modified)
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">Sports_Products</Link>
        <div>
          <Link to="/cart">Cart</Link>
          {/* Conditional rendering for admin link */}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/orderlist">Admin</Link>
          )}
          {userInfo ? (
            <div>
              <span>{userInfo.name}</span>
              <Link to="/profile">Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link> {/* <-- New Link Added */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;