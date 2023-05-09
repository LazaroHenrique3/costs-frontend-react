import React from 'react'

//Styles
import styles from './style.module.css'

const Input = ({ type, text, name, placeholder, register }) => {

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                {...register(`${name}`)}
            />
        </div>
    )
}


export default Input