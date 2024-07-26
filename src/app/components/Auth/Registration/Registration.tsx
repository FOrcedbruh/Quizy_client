import styles from './Registration.module.css';
import Button from '../../Button/Button';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { registration } from '../../../../instance/auth';
import { useAuthContext } from '../../../../context/autnContext';
import { useNavigate } from 'react-router-dom';
import useNotifications from '../../../../zustand/useNotifications';

interface RegPropsType {
    setAuthWindowState: Dispatch<SetStateAction<boolean>>
}

interface FormStateType {
    username: string,
    email: string,
    password: string
}

const Registration: React.FC<RegPropsType> = ({setAuthWindowState}) => {

    const { setAuthUser } = useAuthContext()

    const {
        handleSubmit,
        reset,
        register,
        formState: {
            errors,
            isValid
        }
    } = useForm<FormStateType>({
        'mode': 'onChange'
    });

    const navigate = useNavigate();

    const { setNotification } = useNotifications();

    const onSubmit = async (data: FormStateType) => {
        

        const userData = await registration(data);
        if (userData.username) {
            localStorage.setItem('authUser', JSON.stringify(userData));
            //@ts-ignore
            setAuthUser(userData);
            setNotification('Account successfully create :)')
            navigate('/profile');
        } else {
            setNotification(userData);
        }
        
        reset();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1>Registration</h1>
            <input type="text" placeholder='username' {...register('username', {
                required: 'enter username'
            })}/>
            {errors.username && <div className={styles.error}>{errors.username.message}</div>}
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
            <Button type='submit' width={'100%'} disabled={!isValid}>
                <p>Sign up</p>
            </Button>
            <a  onClick={() => setAuthWindowState(false)}>Already have an account? Login</a>
        </form>
    )
}


export default Registration;