import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import AuthContext from './contexts/authContext'

import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import { useState } from "react"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])

  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App