import styles from './Quiz.module.css';
import { useParams } from 'react-router-dom';
import { GetQuiz } from '../../../instance/quizApi';
import { useEffect, useState } from 'react';
import IQuiz from '../../../types/IQuiz';

const Quiz: React.FC = () => {

    const { id } = useParams();

    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [step, setStep] = useState<number>(0);
    const [corrects, setCorrects] = useState<number>(0);

    const getData = async () => {
        const data = await GetQuiz(id!);

        console.log(data)
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

    if (step >= quiz?.body.length!) {
        return (
            <>
                <Result corrects={corrects}/>
            </>
        )
    }

    return (
        <section className={styles.window}>
            <h1>
                Quizy
            </h1>
            <h2>
                {quiz?.title}
            </h2>
            <div className={styles.quiz} style={{'backgroundColor': quiz?.mainColor}}>
                <h4>{quiz?.body[step].question}</h4>
                <ul>
                    {quiz?.body[step].answers.map((answer, index) => {
                        return (
                            <li onClick={() => onSelect(index)} key={index} style={{'backgroundColor': quiz.listColor, 'color': quiz.textColor}}>
                                {answer}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

interface ResultPropsType {
    corrects: number
}

const Result: React.FC<ResultPropsType> = ({ corrects }) => {
    return (
        <div>
            {corrects}
        </div>
    )
}

export default Quiz;