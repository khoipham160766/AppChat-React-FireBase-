import React, {  useState } from "react";
import {useNavigate} from 'react-router-dom';
import {getAuth,  onAuthStateChanged} from 'firebase/auth';
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider ({children}) {
    //variables
    const auth=getAuth();
    const navi=useNavigate();
    const [user, setUser] = useState({});
    const [isLoading, setisLoading] = useState(true);
    //function
    React.useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth, (user)=>{ //get information user
            if(user){
                const {displayName, email, uid, photoURL} = user;
                setUser({
                    displayName, email, uid, photoURL
                });
                setisLoading(false);
                navi('/');
                return;
            }
            setisLoading(false);
            navi('/login');

        
        })
        //clean function
        return () => {
            unsubscribed();
        }
    },[navi,auth])
   
    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin />:children}
        </AuthContext.Provider>
    )
}