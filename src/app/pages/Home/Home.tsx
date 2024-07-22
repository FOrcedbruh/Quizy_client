import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectFlip, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
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




interface IFlip {
    category?: string,
    question: string,
    color: string
}

const flips: IFlip[] = [
    {
        question: 'What is the most widely used operating system for smartphones?',
        category: 'IT',
        color: '#478CCF'
    },
    {
        question: 'In which year did World War II end?',
        category: 'History',
        color: '#8D493A'
    },
    {
        question: 'What is the term for a written statement made under oath?',
        category: 'Law',
        color: '#C40C0C'
    },
    {
        question: 'Which country won the FIFA World Cup in 2018?',
        category: 'Sport',
        color: '#FF8225'
    },
    {
        question: 'What is the chemical symbol for gold?',
        category: 'Science',
        color: '#4A249D'
    },
    {
        question: 'Who wrote "Hamlet"?',
        category: 'Literature',
        color: '#A0937D'
    },
    {
        question: 'What is the primary currency used in Japan?',
        category: 'Economics',
        color: '#758694'
    },
    {
        question: 'Who painted the Mona Lisa?',
        category: 'Art',
        color: '#E6B9A6'
    },
    {
        question: 'Broaden your horizons :0',
        color: '#000'
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
            <div className={styles.main}>
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
                <div className={styles.FlipSlider}>
                    <Swiper modules={[EffectFlip, Pagination]} grabCursor={true} pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }} effect="flip" style={{'width': '100%', 'height': '100%'}}>
                        {flips.map(slide => {
                            return (
                                <SwiperSlide key={slide.question} className={styles.flipSlide} style={{'backgroundColor': slide.color}}>
                                    <p>{slide.category}</p>
                                    <h2>{slide.question}</h2>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                
            </div>
            
        </section>
    )
}

export default Home;