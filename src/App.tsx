import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import React from "react";
import Login from "./pages/Login/Login";
import Nav from "./components/Nav";
import Admin from "./pages/Admin/Admin";

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);
  return (
    <>
      <Nav />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
