import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AuthPage from "./components/Auth/AuthPage/AuthPage";
import Notification from "./components/Notification/Notification";
import useNotifications from "../zustand/useNotifications";


const App: React.FC = () => {

    const { notification } = useNotifications()


    return (
            <main className='document'>
                 <Notification>
                    <p>{notification}</p>
                </Notification>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />}/>
                        <Route path="/profile" element={<Profile />}/>
                    </Route>
                <Route path="/auth" element={<AuthPage />}/>
                </Routes>
            </main>
    )
}

export default App;