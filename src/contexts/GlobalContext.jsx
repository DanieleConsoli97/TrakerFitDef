import { createContext,useContext } from "react";
import { AuthProvider } from '../contexts/AuthProvider.jsx';
const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
 const value={}

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