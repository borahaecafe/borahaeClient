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
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
            close(false)
        }, 2000)
    }, [ close, message ])
    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label='Success' message='You have been successfully create delete request.' close={setMessage} status={'success'} />
            </div> : null}
            <form onSubmit={onHandleRestock}>
                <h2>How many stock would you like to add in {title}? </h2>
                <input type="text" value={value} onChange={
                    (e) => {
                        setValue(parseInt(e.target.value))
                        if (isNaN(parseInt(e.target.value))) {
                            setValue(0)
                        }
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
