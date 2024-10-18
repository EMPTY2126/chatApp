import { useContext,createContext, useEffect, useState } from "react";
import Authenticator from "../utils/Authenticator";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAuth,setIsAuth] = useState(false);
    const [user,setUser] = useState(null);

    useEffect(()=>{
    const checkAuth = async () => {
        const {flag,userId} = Authenticator();
        if(flag){
            setIsAuth(flag);
            setUser(userId);
        }
    };
    
        checkAuth();
    },[]);

    return (
    <AuthContext.Provider value={{isAuth, setIsAuth,user,setUser}}>
        {children}
    </AuthContext.Provider>
    );

};

export const useAuth=()=>useContext(AuthContext);
