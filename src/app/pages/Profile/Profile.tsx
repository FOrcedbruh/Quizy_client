import styles from './Profile.module.css';
import { useAuthContext } from '../../../context/autnContext';
import { randomAvatar } from '../../../randomAvatars/randomAvtars';
import Button from '../../components/Button/Button';
import logoutIcon from './../../../images/logoutIcon.svg';
import { logout } from '../../../instance/auth';
import useNotifications from '../../../zustand/useNotifications';
import useAuthCheck from '../../../zustand/useAuthCheck';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './../../../images/deleteIcon.svg';
import { deleteAccount } from '../../../instance/auth';
import { useGetQuizzes } from '../../../instance/quizApi';
import { useEffect, useState } from 'react';
import IQuiz from '../../../types/IQuiz';
import { motion } from 'framer-motion';




const Profile: React.FC = () => {

    const { authUser } = useAuthContext();

    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    const getQuizzes = async () => {
        const res = await useGetQuizzes();
        setQuizzes(res);

        console.log(res);
    }

    useEffect(() => {
        getQuizzes();
    }, [])

    //@ts-ignore
    const username = authUser?.username;
     //@ts-ignore
    const avatar = authUser?.avatar;
    //@ts-ignore
    const _id = authUser?._id;

    const randomAvatarPicture = randomAvatar();

    const { setNotification } = useNotifications();

    const { setIsAuth } = useAuthCheck();

    const navigate = useNavigate()

    const logoutHandler = async  () => {
        const message = await logout();
        setNotification(message);
        setIsAuth(false);

        navigate('/auth');
    }

    const deleteHandle = async () => {
        const message: string = await deleteAccount(_id);

        setNotification(message);
        navigate('/auth')
    }

    return (
        <section className={styles.window}>
            <div className={styles.userData}>
                <div className={styles.logoutBtn}>
                    <Button clickHandler={logoutHandler}>
                        <p>Log out</p><img src={logoutIcon} width={24} height={24}/>
                    </Button>
                </div>
                <div className={styles.avatar}>
                    <img src={avatar ? avatar : randomAvatarPicture} width={200} height={200}/>
                </div>
                <h1>{username}</h1>
            </div>
            <div className={styles.container}>
                {quizzes.map(item => {
                    return (
                        <QuizCard key={item._id} props={item}/>
                    )
                })}
            </div>
            <div className={styles.deleteBtn}>
                <Button clickHandler={deleteHandle}>
                    <p>Delete account</p> <img width={24} height={24} src={deleteIcon}/>
                </Button>
            </div>
        </section>
    )
}

interface QuizCardPropsType {
    props: IQuiz
}

const QuizCard: React.FC<QuizCardPropsType> = ({props}) => {

    const [onHover, setOnHover] = useState<boolean>(false);

    return (
        <motion.div 
        initial={{
            opacity: 0
        }}
         animate={{
            opacity: 1
        }}
        whileHover={{
            x: 15,
            y: -30
        }}
        onMouseOut={() => setOnHover(false)} onMouseOver={() => setOnHover(true)}
        className={styles.card} style={{'backgroundColor': props.mainColor, 'color': props.textColor}}>
            <motion.p animate={{
                x: onHover ? 60  : 0
            }}  style={{'backgroundColor': props.listColor}}>{props.title}</motion.p>
            <i>{props.categoryName}</i>
        </motion.div>
    )
}


export default Profile;