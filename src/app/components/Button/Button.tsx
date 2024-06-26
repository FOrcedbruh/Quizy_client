import styles from './Button.module.css';
import { motion } from 'framer-motion';

interface ButtonPropsType {
    clickHandler?: () => void,
    children: React.ReactNode,
    width?: string | number,
    height?: string | number,
    type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean
}



const Button: React.FC<ButtonPropsType> = ({clickHandler, disabled, children, width, height, type}) => {

    return (
        <motion.button
            whileTap={{
                scale: 0.9
            }}
            disabled={disabled}
            type={type} onClick={clickHandler} 
            className={styles.button} 
            style={{'height': height, 'width': width, 'background': disabled ? '#e0e0e0' : '#c3ff93', 'cursor': disabled ? 'not-allowed': 'pointer'}}>
            {children}
        </motion.button>
    )
}

export default Button;