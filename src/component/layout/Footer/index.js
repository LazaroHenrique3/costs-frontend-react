//Icons
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

//Styles
import styles from './style.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href='https://github.com/LazaroHenrique3' target='blank'>
                        <FaGithub />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/lazaro_fernandes_art/' target='blank'>
                        <FaInstagram />
                    </a>
                </li>
                <li>
                    <a href='https://www.linkedin.com/in/lazaro-henrique/' target='blank'>
                        <FaLinkedin />
                    </a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs</span> &copy; 2023
            </p>
        </footer>
    )
}

export default Footer