import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/server/vendor/product/pullout.module.scss'
import { vendorPullOut } from '../../../../util/request/request.mutation'
import { useMutation } from '@apollo/client'
import Message from '../../../message/message'



export default function Pullout({ close, userid, id, stock }: any) {


    const [ pullout, { data } ] = useMutation(vendorPullOut)
    const [ quantity, setQuantity ] = useState(0)
    const [ message, setMessage ] = useState(false)
    const onHandlePullout = (e: any) => {
        e.preventDefault()
        pullout({
            variables: {
                userId: userid,
                productId: id,
                quantity: quantity
            },
            onCompleted: () => {
                setMessage(true)
                setTimeout(() => {
                    close(false)
                }, 2000)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [  message ])

    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label={'Success'} message={'You have successfully created a pull-out request'} status={'success'} close={setMessage} />
            </div> : null}
            <form onSubmit={onHandlePullout}>
                <h2>How many item would you like to pull-out?</h2>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                <div className={styles.btnGrp}>
                    <button type='button' onClick={() => {
                        close(false)
                    }}>No, Cancel</button>
                    <button disabled={quantity > stock} type="submit">Yes, Pull-out</button>
                </div>
            </form>
        </div>
    )
}
