import { Link, Outlet } from "react-router-dom"
import styles from './Layout.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/autnContext";
import menuArrow from './../../../images/menuArrow.svg';
import { logout } from "../../../instance/auth";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuthCheck from "../../../zustand/useAuthCheck";
import useNotifications from "../../../zustand/useNotifications";
import createIcon from './../../../images/createIcon.svg';
import githubLogo from './../../../images/githubLogo.svg';


interface MenuPropsType {
    setMenu: Dispatch<SetStateAction<boolean>>
}

const Menu: React.FC<MenuPropsType> = ({setMenu}) => {

    const { setIsAuth } = useAuthCheck()

    const { setNotification } = useNotifications()

    const navigate = useNavigate();

    const logoutHandler = async () => {
        const message = await logout();
        setIsAuth(false);
        setNotification(message);

        navigate('/auth');
    }

    const listVariants = {
        initial: {
            opacity: 0,
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay: 0.1 * custom}
        })
    }


    return (
        <ul className={styles.menu} onClick={() => setMenu(false)}>
            <motion.li variants={listVariants} initial={'initial'} animate={'animate'} custom={0}><Link to={'/profile'}>profile</Link></motion.li>
            <motion.li variants={listVariants} initial={'initial'} animate={'animate'} custom={1}><Link to={'/'}>settings</Link></motion.li>
            <motion.li variants={listVariants} initial={'initial'} animate={'animate'} custom={2} onClick={logoutHandler}>Log out</motion.li>
        </ul>
    )
}









const Layout: React.FC = () => {

    const [menu, setMenu] = useState<boolean>(false);

    const navigate = useNavigate();

    const { authUser } = useAuthContext();

    const { isAuth , setIsAuth } = useAuthCheck()

    useEffect(() => {
        if (authUser) {
            setIsAuth(true)
        }
    }, [authUser])
    
    //@ts-ignore
    const username: string = authUser?.username;
    //@ts-ignore
    const avatar: string = authUser?.avatar;

    return (
        <>
            <header className={styles.header}>
                {menu && <Menu setMenu={setMenu}/>}
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <img src="" />
                    <h1>Quizzy</h1>
                </div>
                {isAuth && <div className={styles.createBtn} onClick={() => navigate('/createQuiz')}>
                    <p>Create</p><img src={createIcon} width={30} height={30} />
                </div>}

                {isAuth ? 
                <div className={styles.user}>
                    <Link to={'/profile'}>{username}</Link>
                    {avatar && <img src={avatar} width={30} height={30}/>}
                    <img onClick={() => setMenu(!menu)} className={styles.menuBtn} src={menuArrow} width={24} height={24}/>
                </div> : <div className={styles.reg}>
                    <Link to={'/auth'}>Login</Link>
                </div>}
            </header>
            <main className={styles.container}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <div>
                    <h1>Quizzy</h1>
                    <div className={styles.socialNets}>
                        <a target="_blank" href="https://github.com/FOrcedbruh/Quizy_client.git"><motion.img whileHover={{ scale: 1.2 }} src={githubLogo} alt="github" width={30} height={30}/></a>
                    </div>
                </div>
                <ul>
                    
                </ul>
            </footer>
        </>
        
    )
}

export default Layout;