import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
});

interface authFuncsType {
    username?: string,
    password: string,
    email: string
}




export const registration = async (props: authFuncsType) => {
    try {
        const res = await instance.post('auth/registration', {
            username: props.username,
            email: props.email,
            password: props.password
        });
    
        return res.data;
    } catch (error) {
        //@ts-ignore
        return error.response.data.message;
    }

  
}

export const login = async (props: authFuncsType) => {

    try {
        const res = await instance.post('auth/login', {
            email: props.email,
            password: props.password
        });

        return res.data
    } catch (error) {
        //@ts-ignore
        return error.response.data.message;
    }

       
}

export const logout = async () => {
    const res = await instance.post('auth/logout');
    localStorage.clear();

    return res.data.message;
}

export const deleteAccount = async (_id: string) => {
    const res = await instance.post(`auth/delete/${_id}`);
    localStorage.clear();

    return res.data.message;
}

export const updateAvatar = async (formData: any) => {
    const res = await fetch('http://localhost:8080/auth/setAvatar', {
        method: 'POST',
        body: formData
    })

    const resData = await res.json();

    return resData;
}

