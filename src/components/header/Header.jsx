import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <nav className="flex justify-between items-center w-full z-20 fixed top-0 left-0 h-16 border-b bg-lightblue-500 shadow-lg px-6 md:px-10 lg:px-14 py-3">
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/" className="hover:text-blue-500">
          MyApp
        </Link>
      </div>
      <div className="flex gap-x-4 items-center text-sm">
        {userLoggedIn ? (
          <>
            <NavLink
              to="/add-students"
              className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
            >
              Add Students
            </NavLink>
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate('/login');
                });
              }}
              className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
              to="/register"
            >
              Register New Account
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
