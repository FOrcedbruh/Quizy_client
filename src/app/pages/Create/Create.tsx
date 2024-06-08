import styles from './Create.module.css';
import { useState } from 'react';
import arrowIcon from './../../../images/arrow.svg';
import { useNavigate, Link } from 'react-router-dom';
import ICategory from '../../../types/ICategory';
import crossIcon from './../../../images/cross.svg';
import { motion, useTime } from 'framer-motion';
import IStep from '../../../types/IStep';
import Input from '../../components/ConstructorInput/Input';


const categories: ICategory[] = [
    {
        id: 0,
        name: 'Science',
        bg: '#850F8D'
    },
    {
        id: 1,
        name: 'Sport',
        bg: '#FF7D29'
    },
    {
        id: 2,
        name: 'Law',
        bg: '#FF0000'
    }, 
    {
        id: 3,
        name: 'History',
        bg: '#6F4E37'
    },
    {
        id: 4,
        name: 'IT',
        bg: '#40A578'
    },
    {
        id: 5,
        name: 'Celebrities',
        bg: '#FFFF80'
    },
    {
        id: 6,
        name: 'Geography',
        bg: '#5F374B'
    },
    {
        id: 7,
        name: 'Medicine',
        bg: '#5356FF'
    },
    {
        id: 8,
        name: 'Others',
        bg: '#9BB0C1'
    }
]

const CreatePage: React.FC = () => {

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<ICategory | null>(null);
    const [step, setStep] = useState<IStep[]>([]);
    const [question, setQuestion] = useState<string>('question');
    const [answer, setAnswer] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);

    const navigate = useNavigate();

    const goBack = () => navigate(-1);


    const createAnswer = () => {
        setAnswers([...answers, answer]);
        setAnswer('');
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
                                        <article onClick={() => {setCategory(item); console.log(category)}} style={{'backgroundColor': category?.id === item.id ? category?.bg : '#e4e4e4'}} className={styles.category}>
                                            <p>{item.name}</p><motion.img initial={{ rotate: 45 }} animate={{ rotate: index === category?.id ? 0 : 45 }} src={crossIcon} width={12} height={12}/>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                </div>
                <div className={styles.container}>
                   <section className={styles.quiz}>
                    <h2>{question}</h2>

                    <ul>
                        {answers.map(answer => {
                            return (
                                <li>{answer}</li>
                            )
                        })}
                    </ul>
                   </section>
                   <div className={styles.constructorInputs}>
                        <Input placeholder='Come up a question' value={question} onChange={(e) => setQuestion(e.target.value)}/>
                        <Input BtnText='push' click={createAnswer} placeholder='Enter an answer' value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                   </div>
                  
                </div>
            </div>
            
        </section>
    )
}

export default CreatePage;