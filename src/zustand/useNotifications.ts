import { create } from "zustand";

interface StateTypeProps {
    notification: string,
    setNotification: (notification: string) => void
}

const useNotifications = create<StateTypeProps>((set) => ({
    notification: '',
    setNotification: (notification: string) => set({notification})
}));

export default useNotifications;