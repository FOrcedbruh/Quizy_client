import { create } from "zustand";

interface StoreType {
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void
}

const useAuthCheck = create<StoreType>((set) => ({
    isAuth: false,
    setIsAuth: (isAuth) => set({isAuth})
}));

export default useAuthCheck;


