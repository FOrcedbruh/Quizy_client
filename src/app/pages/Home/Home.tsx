import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './Home.module.css';
import { motion } from "framer-motion";


interface CardType {
    color: string,
    title: string
}


const slides: CardType[] = [
    {
        title: 'Create quizzies ;)',
        color: 'blueviolet'
    },
    {
        title: 'Share it with friends, ',
        color: 'coral'
    },
    {
        title: 'colleagues, ',
        color: '#4535C1'
    },
    {
        title: 'with anyone...',
        color: '#F4CE14'
    },
    {
        title: 'Develop and just create!',
        color: '#5DEBD7'
    },
    {
        title: 'Start a journey)))',
        color: '#EB5B00'
    }
]


const Home: React.FC = () => {
    return (
        <section className={styles.window}>
            <div className={styles.slider}>
                <Swiper
                    className={styles.swiper}
                    effect="cards"
                    grabCursor={true}
                    modules={[EffectCards]}
                >
                   {slides.map(slide => {
                    return (
                        <SwiperSlide style={{'backgroundColor': slide.color}} className={styles.slide} key={slide.title}>{slide.title}</SwiperSlide>
                    )
                   })}
                </Swiper>
            </div>
            <motion.h1 className={styles.welcomeText}
                initial={{
                    opacity: 0,
                    y: -40
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
            >
                Welcome to galaxy of <span>Quizzies</span>
            </motion.h1>
        </section>
    )
}

export default Home;