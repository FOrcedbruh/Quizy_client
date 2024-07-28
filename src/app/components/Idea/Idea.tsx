import IQuiz from '../../../types/IQuiz';
import styles from './Idea.module.css';



interface IdeaPropsType {
    props: IQuiz;
}



const Idea: React.FC<IdeaPropsType> = ({ props }) => {



    return (
        <div className={styles.card} style={{'backgroundColor': props.mainColor}}>

        </div>
    )
}



export default Idea;