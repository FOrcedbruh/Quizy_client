import styles from './Create.module.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import arrowIcon from './../../../images/arrow.svg';
import { useNavigate, Link } from 'react-router-dom';
import ICategory from '../../../types/ICategory';
import crossIcon from './../../../images/cross.svg';
import { color, motion } from 'framer-motion';
import Input from '../../components/ConstructorInput/Input';
import { categories } from './categories';
import { mainColors } from './colors';
import { textColors } from './colors';
import Button from '../../components/Button/Button';
import useBodyQuiz from '../../../zustand/useBodyQuiz';
import doneIcon from './../../../images/doneIcon.svg';
import { useCreateQuiz } from '../../../instance/quizApi';
import useNotifications from '../../../zustand/useNotifications';
import clearIcon from './../../../images/clearIcon.svg';




interface QuizyBodyPropsType {
    setCorrect: Dispatch<SetStateAction<number>>,
    answers: string[],
    mainColor: string,
    listColor: string,
    textColor: string,
    question: string,
    correct: number,
    setAnswers: Dispatch<SetStateAction<string[]>>
}

const QuizBody: React.FC<QuizyBodyPropsType> = ({answers, setCorrect, mainColor, listColor, textColor, question, correct, setAnswers}) => {

    const deleteAnswer = (i: number) => {
        answers.splice(i, 1);
        setAnswers([...answers])
    }

    return (
        <section className={styles.quiz} style={{'background': mainColor, 'color': textColor}}>
            <h2>{question}</h2>

            <ul>
                {answers.map((answer, index) => {
                    return (
                        <motion.li onClick={() => setCorrect(index)} style={{'backgroundColor': listColor, 'border': index===correct ? ' 1px solid chartreuse' : ''}} whileHover={{ opacity: 0.7 }} initial={{ x: -60, scale: 0.8 }} animate={{ x: 0, scale: 1 }} key={index}>{answer} <div onClick={() => deleteAnswer(index)}><img style={{'alignSelf': 'flex-end'}} src={crossIcon} width={14} height={14}/></div></motion.li>
                    )
                })}
            </ul>
        </section>
    )
}

const CreatePage: React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<ICategory | null>(null); 
    //const [step, setStep] = useState<IStep>({question: '', answers: [''], correct: 0});
    const [question, setQuestion] = useState<string>('Question');
    const [answer, setAnswer] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [mainColor, setMainColor] = useState<string>('#850F8D');
    const [textColor, setTextColor] = useState<string>('#ffffff');
    const [listColor, setListColor] = useState<string>('#151515');
    const [correct, setCorrect] = useState<number>(0);
    const [confirm, setConfirm] = useState<boolean>(false);


    const { body, setBody, resetBody } = useBodyQuiz();


    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const { setNotification } = useNotifications()


    const createAnswer = () => {
        if (answer) {
            setAnswers([...answers, answer]);
            setAnswer('');
        } else {
            return ;
        }
        
    }

    const auth = localStorage.getItem('authUser');

    useEffect(() => {
        if (!auth) {
            navigate('/auth')
        } else {
            return ;
        }
       
    }, [auth]);


    const createStep = () => {

        if (question && answers.length > 0) {
            setBody({
                question,
                answers,
                correct
            });
    
            setAnswers([]);
            setQuestion('Question');
            setCorrect(0);
        } else {
            setNotification('Enter all please ;)')
        }
    }

    const Create = async () => {

        if (confirm) {
            const categoryName = category?.name;

            //@ts-ignore
            await useCreateQuiz(title, categoryName, mainColor, textColor, listColor, body);
        } else {
            return ;
        }
    }

    const resetAll = () => {
        setAnswers([]);
        setQuestion('Question');
        resetBody();
        setMainColor('#850F8D');
        setListColor('#151515');
        setTextColor('#ffffff');
        setTitle('');
        setCategory(null);
        setConfirm(false)
    }

    const confirmHandler = () => {
        if (category && title && (body.length > 0) && mainColor && listColor && textColor) {
            setConfirm(!confirm);
            createStep()
        } else {
            setNotification('Enter all fileds :)');
        }
    }

    
    return (
        <section className={styles.window}>
            <header className={styles.header}>
                <div onClick={goBack} className={styles.backBtn}><img src={arrowIcon} width={24} height={24}/> <p>Back</p></div>
                <Link to={'/'} style={{'textDecoration': 'none'}}><h1>Quizy</h1></Link>
            </header>
            <div className={styles.main}>
                <div className={styles.sidebar}>

                    <h1>{title ? title : 'Enter Quizname'}</h1>
                    <input type="text" placeholder='Quizname' value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <div className={styles.categories}>
                            <h3>Select a category</h3>
                            <div>
                                {categories.map((item, index) => {
                                    return (
                                        <article key={index} onClick={() => {setCategory(item)}} style={{'backgroundColor': category?.id === item.id ? category?.bg : '#e4e4e4'}} className={styles.category}>
                                            <p>{item.name}</p><motion.img initial={{ rotate: 45 }} animate={{ rotate: index === category?.id ? 0 : 45 }} src={crossIcon} width={12} height={12}/>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.colors}>
                            <h3>Set main color</h3>
                            <div className={styles.currentColors}>
                                {mainColors.map((color, index) => {
                                    return (
                                        <motion.div whileHover={{ scale: 1.1 }} key={index} onClick={() => setMainColor(color)} className={styles.color} style={{'background': color, 'border': mainColor === color ? `2px solid chartreuse` : `2px solid transparent`}}></motion.div>
                                    )
                                })}
                            </div>
                            <h3>Text color</h3>
                            <div className={styles.currentColors}>
                                {textColors.map((color, index) => {
                                    return (
                                        <motion.div key={index} whileHover={{ scale: 1.1 }} onClick={() => setTextColor(color)} className={styles.color} style={{'background': color, 'border': textColor === color ? `2px solid chartreuse` : `2px solid transparent`}}></motion.div>
                                    )
                                })}
                            </div>
                            <h3>List color</h3>
                            <div className={styles.currentColors}>
                                {mainColors.map((color, index) => {
                                    return (
                                        <motion.div className={styles.color} key={index} whileHover={{ scale: 1.1 }} onClick={() => setListColor(color)} style={{'background': color, 'border': listColor === color ? `2px solid chartreuse` : `2px solid transparent`}}></motion.div>
                                    )
                                })}
                            </div>
                        </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.steps}>
                        {body.map((step, index) => {
                            return (
                                    <QuizBody key={index} setAnswers={setAnswers} mainColor={mainColor}  textColor={textColor} listColor={listColor} correct={step.correct} answers={step.answers} question={step.question} setCorrect={setCorrect}/>
                                )
                        })}
                        <QuizBody setAnswers={setAnswers} mainColor={mainColor}  textColor={textColor} listColor={listColor} correct={correct} answers={answers} question={question} setCorrect={setCorrect}/>
                    </div>
                   
                    <div className={styles.constructorInputs}>
                        
                            <motion.button onClick={resetAll}  whileHover={{
                                width: 200,
                                backgroundColor: '#850f8d',
                                color: '#fff'
                            }} className={styles.clearBtn}><p>Reset all</p><img width={24} height={24} src={clearIcon}/></motion.button>
                            
                            {!confirm && <Input placeholder='Come up a question' value={question} onChange={(e) => setQuestion(e.target.value)}/>}
                            {!confirm && <Input BtnText='push' click={createAnswer} placeholder='Enter an answer' value={answer} onChange={(e) => setAnswer(e.target.value)}/>}
                            
                            

                            <div style={{'display': 'flex', 'gap': 10, 'justifyContent': 'center', 'flexDirection': 'column'}}>
                                {!confirm && <Button clickHandler={createStep} width={60} height={40}>
                                    <img src={arrowIcon} width={20} height={20} style={{'rotate': '180deg'}}/>
                                </Button>}
                                {body.length > 0 && <p>steps: {body.length}</p>}
                                <Button width={200} height={30} clickHandler={confirmHandler}>
                                    {confirm ? <p>change settings</p> : <p>confirm settings</p>}
                                </Button>
                            </div>
                            
                    </div>
                   
                </div>
            </div>
            {confirm && <motion.button className={styles.createBtn} onClick={Create}>
                <h3>Create</h3> <img src={doneIcon} width={24} height={24} />
            </motion.button>}
        </section>
    )
}

export default CreatePage;