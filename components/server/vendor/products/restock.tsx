import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/server/vendor/product/restock.module.scss'
import { useMutation } from '@apollo/client'
import { vendoRestock } from '../../../../util/request/request.mutation'
import Message from '../../../message/message'

export default function Restock({ userid, id, close, title }: any) {

    const [ value, setValue ] = useState(0)
    const [ message, setMessage ] = useState(false)
    const [ restock, { data } ] = useMutation(vendoRestock)


    const onHandleRestock = (e: any) => {
        e.preventDefault()
        restock({
            variables: {
                userId: userid,
                productId: id,
                stock: value
            },
            onCompleted: () => {
                setMessage(true)
                close(false)
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
                <Message label='Success' message='You have been successfully create delete request.' close={setMessage} status={'success'} />
            </div> : null}
            <form onSubmit={onHandleRestock}>
                <h2>How many stock would you like to add in {title}? </h2>
                <input type="number" value={value} onChange={
                    (e) => {
                        setValue(parseInt(e.target.value))
                    }
                } />
                <div className={styles.btnGrp}>
                    <button type="button" onClick={() => close(false)} >Cancel</button>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}
