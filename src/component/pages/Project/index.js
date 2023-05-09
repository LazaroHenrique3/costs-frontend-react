
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

//API
import { getProjects, updateProject } from '../../../services/api'

//Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Styles
import styles from './style.module.css'

//Components
import Loading from '../../layout/Loading'
import Container from '../../layout/Container'
import ProjectForm from '../../project/ProjectForm'
import ServiceForm from '../../service/ServiceForm'
import ServiceCard from '../../service/ServiceCard'

function Project() {
    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {
        try {
            async function getProjectById() {
                const { data } = await getProjects(id)

                setProject(data)
                setServices(data.services)
            }

            getProjectById()
        } catch (error) {
            toast.error('Erro inesperado, tente mais tarde!')
        }
    }, [id])

    async function editProject(projectForUpdate) {
        try {
            let projectUpdate = { ...project, ...projectForUpdate }

            //Budget validation
            if (projectUpdate.budget < projectUpdate.cost) {
                toast.error('O orçamento não pode ser maior que o custo do projeto!')
                return false
            }

            const { data } = await updateProject(projectUpdate, id)

            setProject(data)
            setShowProjectForm(false)

            toast.success('Projeto atualizado com sucesso!')
        } catch (error) {
            const errorMessage = (error.response.request.status === 409) ? `Projeto "${projectForUpdate.name}" já existe!` : 'Erro inesperado, tente mais tarde!'
            toast.error(errorMessage)
        }
    }

    async function createService() {
        try {
            const copyProject = { ...project }

            //Validção dos serviços
            const lastService = copyProject.services[copyProject.services.length - 1]

            const lastServiceCost = lastService.cost

            //Custo total que vai ter
            const newCost = parseFloat(copyProject.cost) + parseFloat(lastServiceCost)

            //maximum value validation
            if (newCost > parseFloat(copyProject.budget)) {
                toast.error('Orçamento ultrapassado, verifique o valor do serviço!')
                copyProject.services.pop()
                return false
            }

            //Adicionar o custo do serviço para o custo total do projeto
            copyProject.cost = newCost

            copyProject.category = copyProject.category._id

            //Update
            const { data } = await updateProject(copyProject, id)
            setProject(data)
            setServices(data.services)

            toast.success('Serviço adicionado com sucesso!')
        } catch (error) {
            toast.error('Erro inesperado, tente mais tarde!')
        }
    }

    async function removeService(id, cost) {
        try {
            //Refaz a lista do projeto retirando ja o projeto indicado pelo id
            const servicesUpdated = project.services.filter(
                (service) => service._id !== id,
            )

            const projectUpdated = { ...project }

            projectUpdated.category = projectUpdated.category._id
            projectUpdated.services = servicesUpdated
            projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

            //A exclusão basicamente é um update do project sem aquele service
            const { data } = await updateProject(projectUpdated, projectUpdated._id)

            setProject(data)
            setServices(data.services)

            toast.success('Serviço excluído com sucesso!')
        } catch (error) {
            toast.error('Erro inesperado, tente mais tarde!')
        }
    }

    //Define se deve ou não msotrar o form
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    //Define se deve ou não msotrar o form
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editProject} btnText="Concluir edição" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} btnText="Adicionar Serviço" projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard id={service._id} name={service.name} cost={service.cost} description={service.description} key={service._id} handleRemove={removeService} />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project