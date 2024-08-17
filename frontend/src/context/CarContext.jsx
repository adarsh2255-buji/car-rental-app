import { createContext, useState } from "react";

export  const CarContext = createContext();

 const CarProvider = ({children}) =>{
    const [selectedCarId, setSelectedCarId] = useState(null);

    return(
        <CarContext.Provider value={{selectedCarId, setSelectedCarId}}>
            {children}
        </CarContext.Provider>
    )
}

export default CarProvider