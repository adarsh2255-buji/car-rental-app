import React, { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRouter = ({children}) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
      if(!user){
        return navigate('/signup')
    }
    }, [user, navigate])
    
  return user ? children : null;
}

export default ProtectedRouter