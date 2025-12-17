import { createBrowserRouter } from "react-router";
import NoPage from "../Templates/404/NoPage";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ArtCard from "../Templates/ArtCard/ArtCard";
import PrivateRoute from "./PrivateRoute";
import AddArt from "../Pages/AddArt/AddArt";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
        {
            index: true,
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
          path: "/add-work",
          element: <PrivateRoute><AddArt></AddArt></PrivateRoute>,
        }
    ],
    errorElement: <NoPage></NoPage>,
  },
]);