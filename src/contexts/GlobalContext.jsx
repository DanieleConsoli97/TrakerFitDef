import { createContext,useContext } from "react";
import { AuthProvider } from '../contexts/AuthProvider.jsx';
import { useState } from "react";

const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
   const[pageSession,setPageSession] =useState(1)

    const value={pageSession,setPageSession}
    console.log(pageSession)
    return (
        
         <GlobalContext.Provider value={value}>
            {/* Avvolgi tutto con AuthProvider */}
            <AuthProvider>
                {children}
            </AuthProvider>
        </GlobalContext.Provider>
    )
}


export {GlobalContextProvider,useGlobalContext}
const useGlobalContext = () => {
    return useContext(GlobalContext)
}