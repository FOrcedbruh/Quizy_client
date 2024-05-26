import styles from './Profile.module.css';
import { useAuthContext } from '../../../context/autnContext';
import { randomAvatar } from '../../../randomAvatars/randomAvtars';

const Profile: React.FC = () => {

    const { authUser } = useAuthContext();

    //@ts-ignore
    const username = authUser?.username;
     //@ts-ignore
    const avatar = authUser?.avatar;

    const randomAvatarPicture = randomAvatar();

    return (
        <section className={styles.window}>
            <div className={styles.userData}>
                <div className={styles.avatar}>
                    <img src={avatar ? avatar : randomAvatarPicture} width={200} height={200}/>
                </div>
                <h1>{username}</h1>
            </div>
            

        </section>
    )
}


export default Profile;