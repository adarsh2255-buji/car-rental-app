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
import SignIn from './components/SignIn.jsx'
import  UserProvider  from './context/UserContext.jsx'

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
      },{
        path: 'signin',
        element: <SignIn />
      },{
        path :'signout',
        element: <Home />
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)
