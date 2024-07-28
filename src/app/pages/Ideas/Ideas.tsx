import styles from './Ideas.module.css'
import { useAuthContext } from '../../../context/autnContext'
import { getIdeas } from '../../../instance/quizApi';
import { useEffect, useState } from 'react';
import IQuiz from '../../../types/IQuiz';
import Idea from '../../components/Idea/Idea';
import Loader from '../../components/Loader/Loader';

const Ideas: React.FC = () => {

    const [ideas, setIdeas] = useState<IQuiz[]>([]);

    const { authUser } = useAuthContext();

    //@ts-ignore
    const username: string = authUser.username;

    const getData = async ( ) => {
        const data = await getIdeas();
        console.log(data)
        setIdeas(data);
    }

    useEffect(() => {
        getData();
    }, []);

    if (!ideas) {
        return <Loader width='100%' height='100vh'/>
    }

    return (
        <section className={styles.window}>
            <h1 className={styles.header}>{username}, ideas for you</h1>
            <div className={styles.ideas}>
                {ideas.map((idea, index) => {
                    return (
                        <Idea key={index} props={idea}/>
                    )
                })}
            </div>
        </section>
    )
}



export default Ideas;