import styles from './Profile.module.css';
import { useAuthContext } from '../../../context/autnContext';
import Button from '../../components/Button/Button';
import logoutIcon from './../../../images/logoutIcon.svg';
import { logout } from '../../../instance/auth';
import useNotifications from '../../../zustand/useNotifications';
import useAuthCheck from '../../../zustand/useAuthCheck';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './../../../images/deleteIcon.svg';
import { deleteAccount } from '../../../instance/auth';
import { useGetQuizzes, deleteQuiz } from '../../../instance/quizApi';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import IQuiz from '../../../types/IQuiz';
import { motion } from 'framer-motion';
import startAvatar from './../../../images/avatars/batmanAvatar.svg';




const Profile: React.FC = () => {

    const { authUser } = useAuthContext();

    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [selected, setSelected] = useState<IQuiz | null>(null);

    const [deletedIndex, setDeletedIndex] = useState<number>(0);

    const getQuizzes = async () => {
        const res = await useGetQuizzes();
        setQuizzes(res);

        console.log(res);
    }

    useEffect(() => {
        getQuizzes();
    }, [quizzes]);

    //@ts-ignore
    const username = authUser?.username;
     //@ts-ignore
    const avatar = authUser?.avatar;
    //@ts-ignore
    const _id = authUser?._id;

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

    const editHandler = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setSelected(null)
        }
    }

    const deleteQuizHandler = async (index: number) => {
        await deleteQuiz(_id, selected?._id!, index);

        setIsEditing(false);
        setSelected(null);
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
                    <img src={avatar ? avatar : startAvatar} width={200} height={200}/>
                </div>
                <h1>{username}</h1>
            </div>
            <div className={styles.actions}>
                <p onClick={editHandler} className={styles.editBtn}>{isEditing ? <>editing...</> : <>edit</>}</p>
                {selected && <i onClick={() => deleteQuizHandler(deletedIndex)}>delete</i>}
            </div>
            
            <div className={styles.container}>
                {quizzes.map((item, index) => {
                    return (
                        <QuizCard index={index} setDeletedIndex={setDeletedIndex} selected={selected} setSelected={setSelected} edit={isEditing} key={item._id} props={item}/>
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
    props: IQuiz,
    edit: boolean,
    selected: IQuiz | null,
    setSelected: Dispatch<SetStateAction<IQuiz | null>>,
    setDeletedIndex: Dispatch<SetStateAction<number>>,
    index: number
}

const QuizCard: React.FC<QuizCardPropsType> = ({props, edit, selected, setSelected, setDeletedIndex, index}) => {

    const [onHover, setOnHover] = useState<boolean>(false);
    

    const navigate = useNavigate();


    const onClick = () => {
        if (edit) {
            setSelected(props);
            setDeletedIndex(index);
            if (selected) {
                setSelected(null);
                setDeletedIndex(0)
            }
        } else {
            navigate(`/quiz/${props._id}`);
        }
        
    }

    return (
        <motion.div onClick={onClick}
        initial={{
            opacity: 0
        }}
         animate={{
            opacity: edit ? 0.8 :  1
        }}
        whileHover={{
            x: 15,
            y: -30
        }}
        onMouseOut={() => setOnHover(false)} onMouseOver={() => setOnHover(true)}
        className={styles.card} style={{'backgroundColor': props.mainColor, 'color': props.textColor}}>
            {selected === props && <p style={{'zIndex': 10, 'position': 'absolute'}}>selected</p>}
            <motion.p animate={{
                x: onHover ? 60  : 0
            }}  style={{'backgroundColor': props.listColor}}>{props.title}</motion.p>
            <i>{props.categoryName}</i>
        </motion.div>
    )
}


export default Profile;