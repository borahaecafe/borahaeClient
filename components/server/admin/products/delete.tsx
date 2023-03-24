import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { deleteProducts } from '../../../../util/products/product.mutation'
import styles from '../../../../styles/components/server/admin/product/delete.module.scss'
import { gpUser } from '../../../../util/products/product.query'
import Message from '../../../message/message'



export default function DeleteProduct({ close, id, userid }: any) {


    const [ deleteProduct, { data, error } ] = useMutation(deleteProducts)
    const [ message, setMessage ] = useState(false)

    const onDeleteBtn = (e: any) => {
        e.preventDefault();
        deleteProduct({
            variables: {
                productId: id,
                userId: userid
            },
            onCompleted: () => {
                setMessage(true)
            },
            onError: () => {
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
            close(false)
            setMessage(false)
        }, 3000)

    }, [ close, message, userid ])

    return (
        <div className={styles.container}>
            {
                data && message ? <div className={styles.message}>
                    <Message label={'Success'} message="Product has been successfully deleted" status={'success'} close={setMessage} />
                </div> : null
            }
            {
                error && message ? <div className={styles.message}>
                    <Message label={'Error'} message={`${error?.message}`} status={'error'} close={setMessage} /></ div> :
                    null
            }
            <form onSubmit={onDeleteBtn}>
                <h2>Are you sure you want to delete this product?</h2>
                <div className={styles.btnGrp}>
                    <button type='button' onClick={() => {
                        close("")
                    }}>No, Cancel</button>
                    <button type="submit">Yes, Delete</button>
                </div>
            </form>
        </div>
    )
}