import { useNavigate } from 'react-router'

//API
import { createProject } from '../../../services/api'

//Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Component
import ProjectForm from '../../project/ProjectForm'

//Styles
import styles from './style.module.css'

function NewProject() {

    //Permite redirecionar o usuário no caso quando ele der um post
    const navigate = useNavigate()

    async function handleCreateProject(project) {
        try {
            //Initialize cost and services
            project.cost = 0
            project.services = []

            await createProject(project)
            toast.success('Projeto criado com sucesso!')
            navigate('/projects')
        } catch (error) {
            const errorMessage = (error.response.request.status === 409) ? `Projeto "${project.name}" já existe!` : 'Erro inesperado, tente mais tarde!'
            toast.error(errorMessage)
        }
    }

    return (
        <div className={styles.newProject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={handleCreateProject} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject