import { Link, Outlet } from "react-router-dom"
import styles from './Layout.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/autnContext";
import menuArrow from './../../../images/menuArrow.svg';
import { logout } from "../../../instance/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuthCheck from "../../../zustand/useAuthCheck";
import useNotifications from "../../../zustand/useNotifications";

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


    return (
        <ul className={styles.menu} onClick={() => setMenu(false)}>
            <li><Link to={'/profile'}>profile</Link></li>
            <li><Link to={'/'}>settings</Link></li>
            <li onClick={logoutHandler}>Log out</li>
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

            </footer>
        </>
        
    )
}

export default Layout;