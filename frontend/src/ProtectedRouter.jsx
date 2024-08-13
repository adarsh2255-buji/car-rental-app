import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRouter = ({children}) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    if(!user){
        return navigate('/home')
    }
  return children;
}

export default ProtectedRouter