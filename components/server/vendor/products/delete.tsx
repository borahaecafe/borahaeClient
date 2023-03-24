import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from '../../../../styles/components/server/vendor/product/delete.module.scss'
import { vendorRequestDeletion } from '../../../../util/request/request.mutation'

export default function DeleteProduct({ close, id, userid }: any) {

    const [ deleteProduct ] = useMutation(vendorRequestDeletion)
    const [ message, setMessage ] = useState(false)

    const onDeleteBtn = (e: any) => {
        e.preventDefault();
        deleteProduct({
            variables: {
                productId: id,
                userId: userid
            },
            onCompleted: () => {
                close("")
            },
        })
    }

    return (
        <div className={styles.container}>
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
