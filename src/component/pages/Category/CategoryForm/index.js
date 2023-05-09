import { useState, useEffect } from 'react'

//Icons
import { } from 'react-icons/fa'


//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//Components
import Input from '../../../form/Input'
import SubmitButton from '../../.././form/SubmitButton';
import ErrorMessageInput from '../../../form/ErrorMessageInput';

//Styles
import styles from './style.module.css'

//Yup
import * as yup from 'yup'

//Definindo o schema para validação
const categorySchema = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).required('Campo obrigatório!'),
});


function CategoryForm({ handleSubmit, btnText, handleUpdate, cancelUpdate, categoryEdit }) {

    const [name, setName] = useState(categoryEdit.name || '');

    //Colocando o Hook form em ação
    const {
        register,
        setValue,
        reset,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { name },
        resolver: yupResolver(categorySchema)
    });

    // eslint-disable-next-line
    useEffect(() => {
        if (categoryEdit) {
            setName(categoryEdit.name || '');
            setValue('name', categoryEdit.name || '');
        }
    }, [categoryEdit])

    const submit = (data) => {
        (categoryEdit.name) ? handleUpdate(data, categoryEdit.id) : handleSubmit(data)
        reset()
    }

    return (
        <form onSubmit={onSubmit(submit)} className={styles.form}>
            <Input type="text" text="Nome da categoria" name="name" placeholder="Insira o nome da categoria" register={register} />
            <ErrorMessageInput text={errors?.name?.message} />

            <div className={styles.form_actions}>
                <SubmitButton text={btnText} />
                {categoryEdit.name && <SubmitButton typeBtn='button' handleClick={cancelUpdate} text='Cancelar' />}
            </div>
        </form>

    )
}

export default CategoryForm