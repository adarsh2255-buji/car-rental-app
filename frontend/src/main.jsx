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
        element: <Booking />
      },{
        path: '/allBooking',
        element: <AllBooking />
      },{
        path: '/bookingDetails/:id',
        element: <BookingDetails />
      },{
        path: '/checkout',
        element: <Checkout />
      },{
        path: '/admin',
        element: <AdminDashboard />
      },{
        path: 'allBookings',
        element: <GetAllBookings />
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <CarProvider>
    <RouterProvider router={router}/>
      </CarProvider>
    </UserProvider>
  </StrictMode>,
)
