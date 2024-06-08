import styles from './Input.module.css'
import Button from '../Button/Button'



interface InputPropsType {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
    placeholder: string,
    click?: () => any,
    BtnText?: string
}


const Input: React.FC<InputPropsType> = ({value, onChange, placeholder, click, BtnText}) => {


    return (
             <div className={styles.main}>
                <input placeholder={placeholder} type="text" value={value} onChange={(e) => onChange(e)}/>
                {click && <Button clickHandler={click} width={40} height={30}>{BtnText}</Button>}
            </div>
    )
}

export default Input;