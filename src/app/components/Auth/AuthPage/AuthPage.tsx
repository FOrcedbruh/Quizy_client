import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import styles from './AuthPage.module.css';
import {  useState } from "react";
import crossIcon from './../../../../images/cross.svg';
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {

    const navigate = useNavigate();

    const goBack = () => navigate('/');


    const [authWindowState, setAuthWindowState] = useState<boolean>(false);


    return (
        <section className={styles.window}>
            <div onClick={goBack} className={styles.goBack}>
                <img src={crossIcon} width={30} height={30} />
            </div>
            {authWindowState ? <Registration setAuthWindowState={setAuthWindowState}/> : <Login setAuthWindowState={setAuthWindowState}/> }
        </section>
    )
}

export default AuthPage;