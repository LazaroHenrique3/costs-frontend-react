import React from 'react'

//Styles
import styles from './style.module.css'

const Select = ({text, name, options, register, defaultValue}) => {

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} {...register(`${name}`)}>
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option  value={option._id} key={option._id} selected={defaultValue === option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select