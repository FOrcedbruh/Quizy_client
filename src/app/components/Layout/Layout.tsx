import { Link, Outlet } from "react-router-dom"
import styles from './Layout.module.css';
import { useNavigate } from "react-router-dom";



const Layout: React.FC = () => {

    const navigate = useNavigate();
    

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <img src="" />
                    <h1>Quizzy</h1>
                </div>
                <div className={styles.reg}>
                    <Link to={'/auth'}>Login</Link>
                </div>
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