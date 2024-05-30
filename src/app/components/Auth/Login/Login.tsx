import styles from './Login.module.css';
import Button from '../../Button/Button';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../../../instance/auth';
import { useAuthContext } from '../../../../context/autnContext';
import useNotifications from '../../../../zustand/useNotifications';


interface LoginPropsType {
    setAuthWindowState: Dispatch<SetStateAction<boolean>>,
}

interface FormStateType {
    email: string,
    password: string
}

const Login: React.FC<LoginPropsType> = ({setAuthWindowState}) => {

    const {  setNotification } = useNotifications()

    const { setAuthUser } = useAuthContext()

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid
        }
    } = useForm<FormStateType>({
        'mode': 'onChange'
    });

    const navigate = useNavigate()

    const onSubmit = async (data: FormStateType) => {
        const userData = await login(data);
        if (userData.username) {
            localStorage.setItem('authUser', JSON.stringify(userData));
            //@ts-ignore
            setAuthUser(userData);
            setNotification('Успешный вход в аккаунт');
            navigate('/profile');
        } else {
            setNotification(userData);
        }
        
        
        reset();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <input type="email" placeholder='email' {...register('email', {
                required: 'enter email',
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'incorrect email format'
                }
            })}/>
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
            <input type="password" placeholder='password' {...register('password', {
                required: 'enter password',
                minLength: {
                    value: 6,
                    message: 'min 6 symbols'
                }
            })}/>
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
            <Button disabled={!isValid} type='submit'  width={'100%'}>
                <p>Login</p>
            </Button>
            <a onClick={() => setAuthWindowState(true)}>Don't have an account yet? Sign up</a>
        </form>
    )
}

export default Login;