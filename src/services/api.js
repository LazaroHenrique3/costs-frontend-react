import axios from "axios";

//configurando a url de conexão
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})

//Projects
export const getProjects = async (id = "") => {
    const endpoint = (id === "") ? `/projects` : `/projects/${id}`
    return api.get(endpoint)
}

export const createProject = async (project) => {
    return api.post('/projects', project)
}

export const updateProject = async (project, id) => {
    return api.put(`/projects/${id}`, project)
}

export const deleteProject = async (id) => {
    return api.delete(`/projects/${id}`)
}

//Categories
export const getCategories = async () => {
    return api.get(`/categories`)
}

export const createCategory = async (category) => {
    return api.post('/categories', category)
}

export const updateCategory = async (category, id) => {
    return api.put(`/categories/${id}`, category)
}

export const deleteCategory = async (id) => {
    return api.delete(`/categories/${id}`)
}

