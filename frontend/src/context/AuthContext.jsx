import { useContext,createContext, useEffect, useState } from "react";
import Authenticator from "../utils/Authenticator";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAuth,setIsAuth] = useState(false);

    useEffect(()=>{
    const checkAuth = async () => {
        const flag = Authenticator();
        setIsAuth(flag);
        };
    
        checkAuth();
    },[]);

    return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
        {children}
    </AuthContext.Provider>
    );

};

export const useAuth=()=>useContext(AuthContext);
