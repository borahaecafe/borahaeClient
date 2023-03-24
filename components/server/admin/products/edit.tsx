import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/server/admin/product/edit.module.scss'
import { useMutation } from '@apollo/client'
import { updateProducts } from '../../../../util/products/product.mutation'
import { gpUser } from '../../../../util/products/product.query'
import Message from '../../../message/message'

interface UpdateProduct {
    title: string
    price: number
    stock: number
}

export default function Edit({ stock, title, price, close, id, userid }: any) {

    const [ updatesProd, { data, error } ] = useMutation(updateProducts)

    const [ message, setMessage ] = useState(false)

    const [ update, setUpdate ] = useState<UpdateProduct>({
        title: title,
        stock: stock,
        price: price
    })

    const updateProduct = (e: any) => {
        e.preventDefault();
        updatesProd({
            variables: {
                productId: id,
                title: update.title,
                stock: update.stock,
                price: update.price,
                userId: userid
            },
            onCompleted: () => {
                setMessage(true)
            },
            refetchQueries: [ {
                query: gpUser,
                variables: {
                    userId: userid
                }
            } ],
            onQueryUpdated: async (observableQuery) => {
                return await observableQuery.refetch()
            }
        })
    }


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])

    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label={'Success'} message={'You successfully updated'} status={'success'} close={setMessage} />
            </div> : null}
            {error && message ? <div className={styles.message}>
                <Message label={'Error'} message={'There was an error while updating'} status={'error'} close={setMessage} />
            </div> : null}
            <div className={styles.header}>
                <h2>Update Product</h2>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
            <div className={styles.createCon}>
                <form onSubmit={updateProduct}>
                    <div className={styles.createInfo}>
                        <input type="text" placeholder='Product title' value={update.title} onChange={e => setUpdate({ ...update, title: e.target.value })} />
                        <div className={styles.pq}>
                            <input
                                type="text"
                                value={update.stock}
                                onChange={e => {
                                    setUpdate({ ...update, stock: parseInt(e.target.value) })
                                    if (isNaN(parseInt(e.target.value))) {
                                        setUpdate({ ...update, stock: 0 })
                                    }
                                }} placeholder='Stock'

                            />
                            <input type="text"
                                value={update.price} onChange={e => {
                                    setUpdate({ ...update, price: parseInt(e.target.value) })
                                    if (isNaN(parseInt(e.target.value))) {
                                        setUpdate({ ...update, price: 0 })
                                    }
                                }}
                                placeholder='Price' />
                        </div>
                        <button className={styles.sbBtn} type="submit">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
