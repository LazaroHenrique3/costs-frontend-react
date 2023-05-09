import { useState, useEffect } from 'react'

//API
import { getProjects, deleteProject } from '../../../services/api'

//Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Container from '../../layout/Container'
import Loading from '../../layout/Loading'
import LinkButton from '../../layout/LinkButton'
import ProjectCard from '../../project/ProjectCard'

//Styles
import styles from './style.module.css'

function Projects() {
    //Armazenar os projetos
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)//Sempre inicia

    /*const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }*/
    
    useEffect(() => {
        try {
            async function getAllProjects() {
                const { data } = await getProjects();
                setProjects(data)
                setRemoveLoading(true)
            }

            getAllProjects()
        } catch (error) {
            toast.error('Erro inesperado, tente mais tarde!')
        }
    }, [])

    async function removeProject(id) {
        try {
            await deleteProject(id)
            setProjects(projects.filter((project) => project._id !== id))
            toast.success('Projeto removido com sucesso!')
        } catch (error) {
            toast.error('Erro inesperado, tente mais tarde!')
        }
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <div className={styles.buttons_container}>
                    <LinkButton to="/newproject" text="Criar Projeto" />
                    <LinkButton to="/newcategory" text="Criar Categoria" />
                </div>
            </div>
           
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard  id={project._id} name={project.name} cost={project.cost} budget={project.budget} category={project.category.name} key={project._id} handleRemove={removeProject} />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects