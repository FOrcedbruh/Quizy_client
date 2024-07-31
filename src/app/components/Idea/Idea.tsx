import IQuiz from '../../../types/IQuiz';
import styles from './Idea.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


interface IdeaPropsType {
    props: IQuiz;
}



const randomIndexFunc = (len: number): number => {
    return Math.floor(Math.random() * len)
}

const Idea: React.FC<IdeaPropsType> = ({ props }) => {

    const navigate = useNavigate();



    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1}} whileHover={{ scale: 1.05 }} onClick={() => navigate(`/quiz/${props._id}`)} className={styles.card} style={{'backgroundColor': props.mainColor}}>
            <h2 style={{'color': props.textColor}}>#{props.title}</h2>
            <div>
                <p  style={{'color': props.textColor, 'backgroundColor': props.listColor}}>{props.body[randomIndexFunc(props.body.length)].question}</p>
            </div>
        </motion.div>
    )
}



export default Idea;