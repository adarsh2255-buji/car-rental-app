import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from './components/Root.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element : <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',
        element: <SignUp />
      },{
        path: 'home',
        element: <Home />
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
