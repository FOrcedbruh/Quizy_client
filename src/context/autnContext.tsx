import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/IUser";

interface IAuthContext {
    authUser: IUser | string | null,
    setAuthUser: Dispatch<SetStateAction<IUser | string>> | null
}

export const AuthContext = createContext<IAuthContext>({
    authUser: null,
    setAuthUser: null
});


export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const  AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [authUser, setAuthUser] = useState<IUser | string>('');

    useEffect(() => {
        //@ts-ignore
        setAuthUser(JSON.parse(localStorage.getItem('authUser')));
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}


