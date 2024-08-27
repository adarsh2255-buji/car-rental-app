import { createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    

    //check if the user is logged in when the components is mounts

    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser));
        }
    }, [])

    //function to hanlde user login

    const login = (userData) =>{
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); //save user data to local storage
        localStorage.setItem('token', userData.token);
    };

    //function to handle user logout 

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('currentBookingId');
        localStorage.removeItem('selectedCarId');

    };

    return(
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;