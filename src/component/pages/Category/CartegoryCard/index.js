import styles from './style.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function CategoryCard({ id, name, handleEdit, handleRemove }) {

    const remove = () => {
        const confirm = window.confirm(`Tem certeza que deseja excluir a categoria "${name}"`)

        if (confirm) {
            handleRemove(id)
        }
    }


    return (
        <div className={styles.category_card}>
            <h4>{name}</h4>
        
            <div className={styles.category_card_actions}>
                <button onClick={() => handleEdit({id, name})}>
                    <BsPencil /> Editar
                </button>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default CategoryCard
