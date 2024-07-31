import { create } from "zustand";
import IStep from "../types/IStep";

interface StoreType {
    body: IStep[],
    setBody: (step: IStep) => void,
    resetBody: () => void
}

const useBodyQuiz = create<StoreType>((set) => ({
    body: [],
    setBody: (step: IStep) => set(state => {
        return {body: [...state.body, step]}
    }),
    resetBody: () => set(state => {
        console.log(state);
        return { body: []}
    })
}));


export default useBodyQuiz;