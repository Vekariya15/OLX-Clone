import './index.css';
import App from './App';
import * as React from "react";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Signup from './coponents/Signup';
import Home from './coponents/Home';
import Login from './coponents/Login';
import AddProduct from './coponents/AddProduct'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

