import { getFirestore } from "firebase/firestore";
import { app } from "./firebase/firebase.js";

import Register from "./components/auth/register/Register.jsx";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/login/Login.jsx";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import Addstudent from "./components/home/Addstudents.jsx";
import StudentList from "./components/views.jsx";
import StudentDetail from "./components/views.jsx";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path:"/add-students",
      element:<Addstudent />
    },
    {
      path:"/student/:studentId",
      element:<StudentDetail />
    }
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
