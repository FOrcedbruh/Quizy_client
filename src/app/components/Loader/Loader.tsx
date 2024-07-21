import styles from './Loader.module.css'
import { motion } from 'framer-motion';


interface LoaderPropsType {
    width: string,
    height: string
}


const Loader: React.FC<LoaderPropsType> = ({ width, height }) => {


    return (
        <section className={styles.main} style={{'width': width, 'height': height}}>
            <motion.div className={styles.loader}>
                
            </motion.div>
        </section>
    )
}

export default Loader;