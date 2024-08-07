import styles from './Quiz.module.css';
import { useParams } from 'react-router-dom';
import { GetQuiz } from '../../../instance/quizApi';
import { useEffect, useState } from 'react';
import IQuiz from '../../../types/IQuiz';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader/Loader';
import { useNavigate, useLocation } from 'react-router-dom';
import useNotifications from '../../../zustand/useNotifications';


const Quiz: React.FC = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [step, setStep] = useState<number>(0);
    const [corrects, setCorrects] = useState<number>(0);

    const { setNotification } = useNotifications()

    const location = useLocation();

    const getData = async () => {
        const data = await GetQuiz(id!);

        setQuiz(data);
    }

    useEffect(() => {
        getData();
    }, []);

    const onSelect = (index: number) => {
        setStep(step + 1);
        if (index === quiz?.body[step].correct) {
            setCorrects(corrects + 1);
        }
    }

    const listVariants = {
        initial: {
            opacity: 0
        },
        visible: (custom: number) => ({
            opacity: 1,
            transition: { delay: custom * 0.08 }
        })
    }


    if (!quiz) {
        return <Loader width='100%' height='100vh'/>
    }

    
    

    const copyHandler = async () => {
        await navigator.clipboard.writeText(`http://localhost:5173${location.pathname}`);

        setNotification('Quiz link coppied:)');
    }


    return (
        <section className={styles.window}>
            <h1 onClick={() => navigate('/')}>
                Quizzy
            </h1>
            <motion.h2 whileHover={{
                scale: 1.2
            }} onClick={copyHandler}  initial={{
                y: -100
            }} animate={{
                y: 0
            }}>
                {quiz?.title} <sup style={{'color': quiz?.mainColor}}>{quiz?.categoryName}</sup>
            </motion.h2>
            {step >= quiz?.body.length! ? <Result corrects={corrects}/>
            : 
             <motion.div
             initial={{
                opacity: 0,
                y: 30
             }}
              animate={{
                opacity: 1,
                y: 0
             }} className={styles.quiz} style={{'backgroundColor': quiz?.mainColor}}>
                <motion.div className={styles.progress} animate={{
                    width: `${(step / quiz?.body.length!) * 100}%`
                }}></motion.div>
                <h4 style={{'color': quiz.textColor}}>{quiz?.body[step].question}</h4>
                <ul>
                    {quiz?.body[step].answers.map((answer, index) => {
                        return (
                            <motion.li whileHover={{ scale: 1.1}} variants={listVariants} initial={'initial'} animate={'visible'} custom={index + 1} onClick={() => onSelect(index)} key={index} style={{'backgroundColor': quiz.listColor, 'color': quiz.textColor}}>
                                {answer}
                            </motion.li>
                        )
                    })}
                </ul>
            </motion.div>}
        </section>
    )
}

interface ResultPropsType {
    corrects: number
}

const Result: React.FC<ResultPropsType> = ({ corrects }) => {
    return (
        <div className={styles.result}>
            <h3>Your result</h3>
            <h2>
                {corrects}
            </h2>
        </div>
    )
}

export default Quiz;