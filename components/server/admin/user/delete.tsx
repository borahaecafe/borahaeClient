import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/server/admin/user/delete.module.scss'
import { useMutation } from '@apollo/client'
import { deleteMyAccount } from '../../../../util/user/user.mutation'
import { getAllUserQuery } from '../../../../util/user/user.query'
import Message from '../../../message/message'


export default function DeleteUser({ id, close }: any) {

    const [ message, setMessage ] = useState(false)
    const [ delAccount, { data, error } ] = useMutation(deleteMyAccount, {
        variables: {
            userId: id
        },
        onCompleted: () => {
            setMessage(true)
        },
        refetchQueries: [ getAllUserQuery ],
        onQueryUpdated: async (observableQuery) => {
            return observableQuery.refetch()
        }
    })


    const onHandleDelete = (e: any) => {
        e.preventDefault()
        delAccount()
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])
    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label={'Successs'} message={'You have successfully deleted a user'} status={'success'} close={setMessage} />
            </div> : null}
            {data && message ? <div className={styles.message}>
                <Message label={'Error'} message={'There was an error while deleting a user.'} status={'error'} close={setMessage} />
            </div> : null}
            <form>
                <h2>Are your sure do you want to delete this user?</h2>
                <div className={styles.btnGrp}>
                    <button type="button" onClick={() => close("")}>No, Cancel</button>
                    <button onClick={onHandleDelete}>Yes, Delete</button>
                </div>
            </form>
        </div>
    )
}
