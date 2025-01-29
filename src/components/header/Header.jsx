// import React from 'react';
// import { Link, useNavigate, NavLink } from 'react-router-dom';
// import { useAuth } from '../../contexts/authContext';
// import { doSignOut } from '../../firebase/auth';

// const Header = () => {
//   const navigate = useNavigate();
//   const { userLoggedIn } = useAuth();

//   return (
//     <nav className="flex justify-between items-center w-full z-20 fixed top-0 left-0 h-16 border-b bg-lightblue-500 shadow-lg px-6 md:px-10 lg:px-14 py-3">
//       <div className="text-2xl font-bold text-gray-800">
//         <Link to="/" className="hover:text-blue-500">
//           MyApp
//         </Link>
//       </div>
//       <div className="flex gap-x-4 items-center text-sm">
//         {userLoggedIn ? (
//           <>
//             <NavLink
//               to="/add-students"
//               className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
//             >
//               Add Students
//             </NavLink>
//             <button
//               onClick={() => {
//                 doSignOut().then(() => {
//                   navigate('/login');
//                 });
//               }}
//               className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
//               to="/login"
//             >
//               Login
//             </Link>
//             <Link
//               className="text-blue-600 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
//               to="/register"
//             >
//               Register New Account
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { HiSearch } from 'react-icons/hi'; // Search Icon
import { HiOutlineUser, HiLogout } from 'react-icons/hi'; // Profile and Logout Icons
import { FaUserPlus } from 'react-icons/fa'; // Add Students Icon
import { IoNotificationsOutline } from 'react-icons/io5'; // Notification Icon

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown
  const [notifications, setNotifications] = useState(3); // Example notification count

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="flex justify-between items-center w-full z-20 fixed top-0 left-0 h-16 border-b bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg px-6 md:px-10 lg:px-14 py-3">
      <div className="text-2xl font-bold text-white">
        <Link to="/" className="hover:text-blue-200">
          MyApp
        </Link>
      </div>
      <div className="flex gap-x-4 items-center text-sm">
        {/* Conditionally render search and notification section based on user login status */}
        {userLoggedIn && (
          <>
            {/* Search Icon */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-400 rounded-full pl-8 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>

            {/* Notification Icon */}
            <div className="relative">
              <button className="text-white">
                <IoNotificationsOutline className="text-2xl" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </>
        )}

        {userLoggedIn ? (
          <>
            {/* Profile Icon - Dropdown Menu */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-x-2 text-white">
                <HiOutlineUser className="text-2xl" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-56">
                  <NavLink
                    to="/add-students"
                    className="flex items-center gap-x-3 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-md transition-all"
                  >
                    <FaUserPlus className="text-xl text-blue-500" />
                    <span className="text-sm font-medium">Add Students</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      doSignOut().then(() => {
                        navigate('/login');
                      });
                    }}
                    className="flex items-center gap-x-3 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-md transition-all"
                  >
                    <HiLogout className="text-xl text-red-500" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              className="text-white border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-white border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-800 transition-all"
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
