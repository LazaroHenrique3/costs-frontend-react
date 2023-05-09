import styles from './style.module.css'

function SubmitButton({ text, typeBtn='submit', handleClick}){
    return (
        <div>
           <button onClick={handleClick} className={styles.btn} type={typeBtn} >{text}</button>
        </div>
    )
}

export default SubmitButton