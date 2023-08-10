import React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/viewCreator'
import AddCreator from './pages/AddCreator'
import ShowCreators from './pages/showCreators'
import ErrorPage from "./error-page";

import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />
  },
  {
    path: "/creators/",
    element: <ShowCreators />
  },
  {
    path: "/creators/:id",
    element: <ViewCreator />
  },

  {
    path: "/edit/:id",
    element: <EditCreator />
  },

  {
    path: "/add",
    element: <AddCreator />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
