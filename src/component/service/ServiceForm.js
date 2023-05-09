//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//Componnts
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import ErrorMessageInput from '../form/ErrorMessageInput'

//Styles
import styles from '../project/ProjectForm/style.module.css'

//Yup
import * as yup from 'yup'

//Definindo o schema para validação
const projectSchema = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).required('Campo obrigatório!'),
    cost: yup.number().positive('Custo deve ter valor positivo!').typeError('Custo deve ser um número válido!').required('Campo obrigatório!'),
    description: yup.string().transform(value => (value ? value.trim() : '')).required('Campo obrigatório!')
});

function ServiceForm({handleSubmit, btnText, projectData}) {

    //Colocando o Hook form em ação
    const {
        register,
        reset,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({
        //defaultValues,
        resolver: yupResolver(projectSchema)
    });

    function submit(data){
        //Adiciona o novo serviço dentro do objeto original e depois faz a submissão, que esta no componente pai
        const existsService = projectData.services.find((p) => p.name === data.name);
        if(!existsService){
            projectData.services.push(data)
            handleSubmit(projectData)
            reset()
        } else {
           window.alert(`Já existe um serviço chamado "${data.name}"!`)
        }
    }

    return(
        <form onSubmit={onSubmit(submit)} className={styles.form}>
            <Input type="text" text="Nome do serviço" name="name" placeholder="Insira o nome do serviço" register={register}/>
            <ErrorMessageInput text={errors?.name?.message} />

            <Input type="number" text="Custo do serviço" name="cost" placeholder="Insira o valor total" register={register}/>
            <ErrorMessageInput text={errors?.cost?.message} />

            <Input type="text" text="Descrição do serviço" name="description" placeholder="Descreva o serviço" register={register}/>
            <ErrorMessageInput text={errors?.description?.message} />

            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm