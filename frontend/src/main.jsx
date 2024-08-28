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
import Booking from './components/Booking.jsx'
import CarProvider from './context/CarContext.jsx'
import AllBooking from './components/AllBooking.jsx'
import BookingDetails from './components/BookingDetails.jsx'
import Checkout from './components/Checkout.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import GetAllBookings from './components/Admin/GetAllBookings.jsx'
import Aboutus from './components/Aboutus.jsx'
import Contact from './components/Contact.jsx'
import styles from './styles/home.module.css'
import ProtectedRouter from './ProtectedRouter.jsx'


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
      },{
        path: '/booking',
        element: <ProtectedRouter><Booking /></ProtectedRouter>
      },{
        path: '/allBooking',
        element: <ProtectedRouter> <AllBooking /> </ProtectedRouter>
      },{
        path: '/bookingDetails/:id',
        element: <ProtectedRouter><BookingDetails /></ProtectedRouter>
      },{
        path: '/checkout',
        element: <ProtectedRouter><Checkout /></ProtectedRouter>
      },{
        path: '/admin',
        element: <ProtectedRouter><AdminDashboard /></ProtectedRouter>
      },{
        path: 'allBookings',
        element: <ProtectedRouter><GetAllBookings /></ProtectedRouter>
      },{
        path: '/aboutus',
        element: <Aboutus />
      },{
        path: '/contact',
        element: <Contact />
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <div className={styles.home}>
  <StrictMode>
    <UserProvider>
      <CarProvider>
    <RouterProvider router={router}/>
      </CarProvider>
    </UserProvider>
  </StrictMode>
  </div>
)
