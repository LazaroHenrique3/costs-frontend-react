import { useState, useEffect } from 'react'

//API
import { createCategory, getCategories, deleteCategory, updateCategory } from '../../../services/api'


//Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import CategoryForm from '../Category/CategoryForm'
import CategoryCard from '../Category/CartegoryCard'
import Loading from '../../layout/Loading'

//Styles
import styles from './style.module.css'

function NewCategory() {

    const [categories, setCategories] = useState([])
    const [categoryEdit, setCategoryEdit] = useState({})
    const [removeLoading, setRemoveLoading] = useState(false)//Sempre inicia

    //Carregando as categorias cadastradas
    // eslint-disable-next-line
    useEffect(() => {
        async function getAllCategories() {
            const { data } = await getCategories()
            setCategories(data)
            setRemoveLoading(!removeLoading)
        }

        getAllCategories()
    }, []);

    async function handleCreateCategory(category) {
        try {
            //Verificando se essa categoria já existe
            const existsCategory = categories.find((categoryFind) => categoryFind.name === category.name)

            if (existsCategory) {
                toast.error(`A categoria "${category.name}" já esta cadastrada!`)
                return false;
            }

            const { data } = await createCategory(category)
            setCategories([...categories, data])

            toast.success('Categoria criada com sucesso!')
        } catch (error) {
            const errorMessage = (error.response.request.status === 409) ? `Categoria "${category.name}" já existe!` : 'Erro inesperado, tente mais tarde!'
            toast.error(errorMessage)
        }
    }

    function handleSetUpdateCategory(category) {
        setCategoryEdit(category)
    }

    function handleCancelUpdateCategory() {
        setCategoryEdit({})
    }

    async function handleUpdateCategory(category, id) {
        try {
            //Verificando se essa categoria já existe
            const existsCategory = categories.find((categoryFind) => categoryFind.name === category.name)

            if (existsCategory) {
                toast.error(`A categoria "${category.name}" já esta cadastrada!`)
                return false;
            }

            const { data } = await updateCategory(category, id)

            //Atualizando o array de categorias
            const updatedCategories = categories.map(category => category._id === data._id ? data : category);
            setCategories(updatedCategories)

            handleCancelUpdateCategory()
            toast.success('Categoria atualizada com sucesso!')
        } catch (error) {
            console.error('Erro inesperado, tente mais tarde!')
        }
    }

    async function handleRemoveCategory(id) {
        try {
            await deleteCategory(id)
            setCategories(categories.filter((category) => category._id !== id))
            toast.success('Categoria removida com sucesso!')
        } catch (error) {
            const errorMessage = (error.response.request.status === 409) ? `Esta categoria esta vinculada a projeto(s)!` : 'Erro inesperado, tente mais tarde!'
            toast.error(errorMessage)
        }
    }

    return (
        <div className={styles.containerCategory}>
            <div className={styles.newCategoryForm_container}>
                <h1>{(categoryEdit.name) ? 'Editar Categoria' : 'Criar Categoria'}</h1>
                <CategoryForm
                    handleSubmit={handleCreateCategory}
                    handleUpdate={handleUpdateCategory}
                    cancelUpdate={handleCancelUpdateCategory}
                    btnText={(categoryEdit.name) ? 'Editar Categoria' : 'Criar Categoria'}
                    categoryEdit={categoryEdit}
                />
            </div>

            {!removeLoading && <Loading />}
            <div className={styles.allCategories}>
                <h1>Todas Categorias</h1>
                {categories.map((category) => (
                    <CategoryCard id={category._id} name={category.name} handleEdit={handleSetUpdateCategory} handleRemove={handleRemoveCategory} key={category._id} />
                ))}
            </div>
        </div>
    )
}

export default NewCategory