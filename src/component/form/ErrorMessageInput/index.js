//Styles
import styles from './style.module.css'

const ErrorMessageInput = ({text}) => {
  return (
    <small className={styles.message_error}>{text}</small>
  )
}

export default ErrorMessageInput