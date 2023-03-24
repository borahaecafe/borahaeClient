import React, { useState } from 'react'
import styles from '../../../../styles/components/server/vendor/product.module.scss'
import DeleteProduct from './delete'
import Pullout from './pullout'
import Restock from './restock'

export default function ProductList({ id, title, sku, price, stock, userid }: any) {


    const [ open, setOpen ] = useState(false)
    const [ deleteItem, setDeleteItem ] = useState(false)
    const [ pullOutItem, setPullOutItem ] = useState(false)
    const [ restock, setRestock ] = useState(false)


    const onHandleDeleteItem = () => {
        setDeleteItem(() => !deleteItem)
        setOpen(false)
    }

    const onHandlePullOut = () => {
        setPullOutItem(() => !pullOutItem)
        setOpen(false)
    }

    const onHandleRestock = () => {
        setRestock(() => !restock)
        setOpen(false)
    }

    return (
        <div className={styles.bodyRow}>
            {deleteItem ? <div className={styles.itemhover}>
                <DeleteProduct id={id} close={setDeleteItem} userid={userid} />
            </div> : null}
            {pullOutItem ? <div className={styles.itemhover}>
                <Pullout id={id} userid={userid} close={setPullOutItem} stock={stock} />
            </div> : null}
            {restock ? <div className={styles.itemhover}>
                <Restock userid={userid} id={id} close={setRestock} title={title} />
            </div> : null}
            <div className={styles.bodyCell}>
                <div>{title}</div>
                <div>{sku}</div>
                <div>{stock}</div>
                <div>{Intl.NumberFormat("en-PH", {
                    currency: "PHP",
                    style: "currency",
                }).format(price)}</div>
                <div className={styles.ac}>
                    <button className={styles.acbtn} onClick={() => setOpen(() => !open)}>
                        <div />
                        <div />
                        <div />
                    </button>
                    {open ?
                        <div className={styles.options}>
                            <button onClick={onHandlePullOut}>Pull-out</button>
                            <button onClick={onHandleRestock}>Re-stock</button>
                            <button onClick={onHandleDeleteItem}>Delete</button>
                        </div> :
                        null}
                </div>
            </div>
        </div>
    )
}
