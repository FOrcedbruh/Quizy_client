import React, { useEffect } from 'react';
import styles from './Notification.module.css';
import useNotifications from '../../../zustand/useNotifications';
import { motion } from 'framer-motion';

interface NotPropsType {
    children: React.ReactNode
}


const Notification: React.FC<NotPropsType> = ({children}) => {

    const artVariant = {
        hidden: {
            y: -200,
            scale: 0
        },
        visible: {
            y: 0,
            scale: 1
        }
    }

    const { notification, setNotification } = useNotifications();

    useEffect(() => {
        setTimeout(() => setNotification(''), 3000)
    }, [notification])

    if (notification) {
        return (
            <motion.article variants={artVariant} initial={'hidden'} animate={'visible'} className={styles.main}>
                {children}
                <motion.div
                initial={{
                    width: 0
                }}
                animate={{
                    width: 220,
                    transition: { duration: 3, type: 'just' }
                }} className={styles.progress}></motion.div>
            </motion.article>
        )
    } else {
        return 
        <> 

        </>
    }

   
}


export default Notification;