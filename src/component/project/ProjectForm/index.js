import { useEffect, useState } from 'react'

//Icons
import { } from 'react-icons/fa'


//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//API
import { getCategories } from '../../../services/api'

//Components
import Input from '../../form/Input'
import Select from '../../form/Select'
import SubmitButton from '../../form/SubmitButton'
import ErrorMessageInput from '../../form/ErrorMessageInput';

//Styles
import styles from './style.module.css'

//Yup
import * as yup from 'yup'

//Definindo o schema para validação
const projectSchema = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).required('Campo obrigatório!'),
    budget: yup.number().positive('Orçamento deve ter valor positivo!').typeError('Orçamento deve ser um número válido!').required('Campo obrigatório!'),
    category: yup.string().required('Campo obrigatório!')
});


function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project] = useState(projectData || {})

    //Buscando as categorias
    useEffect(() => {
        try {
            async function getAllProjects() {
                const { data } = await getCategories()
                setCategories(data)
            }

            getAllProjects()
        } catch (error) {
            console.error('Erro inesperado, tente mais tarde!')
        }
    }, [])

    //Definindo os valores defaults dos inputs
    const defaultValues = {
        name: (project.name) ? project.name : '',
        budget: (project.budget) ? project.budget : '',
        category: (project.category) ? project.category._id : ''
    }

    //Colocando o Hook form em ação
    const {
        register,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(projectSchema)
    });


    const submit = (data) => {
        handleSubmit(data)
    }

    return (
        <form onSubmit={onSubmit(submit)} className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" register={register} />
            <ErrorMessageInput text={errors?.name?.message} />

            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total" register={register} />
            <ErrorMessageInput text={errors?.budget?.message} />

            <Select name="category" defaultValue={(project.category) ? project.category._id : ''} text="Selecione a categoria" options={categories} register={register} />
            <ErrorMessageInput text={errors?.category?.message} />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm