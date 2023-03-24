import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/server/admin/product/request.module.scss'
import { adminREsupply } from '../../../../util/request/request.mutation'
import { useMutation } from '@apollo/client'
import Message from '../../../message/message'
export default function Request({ close, userid, id, title }: any) {


    const [ requeststock, { data, error } ] = useMutation(adminREsupply)
    const [ message, setMessage ] = useState(false)
    const [ quantity, setQuantity ] = useState(0)



    const onHandleRequestStock = (e: any) => {
        e.preventDefault()
        requeststock({
            variables: {
                userId: userid,
                productId: id,
                quantity: quantity
            },
            onCompleted: () => {
                close(false)
            }
        })
    }
    return (
        <div className={styles.container}>
            {
                data && message ? <div className={styles.message}>
                    <Message label={'Success'} message={'You successfully request.'} status={'success'} close={setMessage} /></div> : null
            }
            {
                error && message ? <div className={styles.message}>
                    <Message label={'Error'} message={'There was an error while requesting.'} status={'error'} close={setMessage} /></div> : null
            }
            <form onSubmit={onHandleRequestStock}>
                <h2>Would you like to request this {title} again?</h2>
                <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
                <div className={styles.btnGrp}>
                    <button type="button" onClick={() => close(false)}>No, Close</button>
                    <button type="submit" >Yes, Request</button>
                </div>
            </form>
        </div>
    )
}
