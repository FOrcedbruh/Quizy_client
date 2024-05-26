import axios from "axios";
import { IUser } from "../types/IUser";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
});

interface authFuncsType {
    username?: string,
    password: string,
    email: string
}




export const registration = async (props: authFuncsType) => {

    const res = await instance.post('auth/registration', {
        username: props.username,
        email: props.email,
        password: props.password
    });

    return res.data;
}

export const login = async (props: authFuncsType) => {

    const res = await instance.post('auth/login', {
        email: props.email,
        password: props.password
    });

    return res.data;
}