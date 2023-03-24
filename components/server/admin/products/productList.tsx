import React, { useState } from 'react'
import styles from '../../../../styles/components/server/admin/product/product.module.scss'
import DeleteProduct from './delete'
import EditProduct from './edit'
import Request from './request'


export default function ProductList({ setd, ides, productID, description, title, stock, sku, price, userid, mySku }: any) {
    const [ id, setID ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ request, setRequest ] = useState(false)


    const onDeleteBtn = () => {
        setID(() => !id)

    }
    const onUpdateBtn = () => {
        setEdit(() => !edit);
    }

    const onRequestRestock = () => {
        setRequest(() => !request)
    }

    return (
        <div className={styles.bodyRow}>
            {id ?
                <div className={styles.itemHov}>
                    <DeleteProduct close={setID} id={productID} userid={userid} />
                </div> : null
            }
            {
                edit ?
                    <div className={styles.itemHov}>
                        <EditProduct stock={stock} description={description} title={title} price={price} close={setEdit} id={productID} userid={userid} />
                    </div> : null
            }
            {
                request ?
                    <div className={styles.itemHov}>
                        <Request close={setRequest} userid={userid} id={productID} title={title} />
                    </div> : null
            }
            <div
                className={styles.bodyCell}>
                <div onClick={() => {
                    setd(() => productID)
                    if (ides === productID) {
                        setd(() => "")
                    }
                }} className={styles.title}>{title}</div>
                <div>{sku}</div>
                <div>{stock}</div>
                <div>{Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP"
                }).format(price)}</div>
                {sku.substring(0, 3) === mySku ? <div className={styles.ac}>
                    <button onClick={onUpdateBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                        </svg>

                    </button>
                    <button onClick={onDeleteBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 25 25" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div> :
                    <div className={styles.ac}>
                        <button onClick={onRequestRestock}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-packge-import" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5" />
                                <path d="M12 12l8 -4.5" />
                                <path d="M12 12v9" />
                                <path d="M12 12l-8 -4.5" />
                                <path d="M22 18h-7" />
                                <path d="M18 15l-3 3l3 3" />
                            </svg>
                        </button>
                    </div>
                }
            </div>
        </div>
    )

}