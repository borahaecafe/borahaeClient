import React, { useEffect, useState } from 'react'
import styles from '../../../../../styles/components/server/admin/user/profile/locked.module.scss'
import { lockedUserAcc } from '../../../../../util/user/user.mutation'
import { useMutation } from '@apollo/client'
import Message from '../../../../message/message'
import { getUserProfile } from '../../../../../util/user/user.query'
export default function Locked({ userid, locked }: any) {

    const [ message, setMessage ] = useState(false)
    const [ lock, setLocked ] = useState(locked)

    const [ LockAccount, { data, error } ] = useMutation(lockedUserAcc)


    const onHandleLockAccount = (e: any) => {
        e.preventDefault()
        LockAccount({
            variables: {
                userId: userid,
                locked: lock
            },

            onCompleted: () => {
                setMessage(true)
            },
            onError: () => {
                setMessage(true)
            },
            refetchQueries: [ {
                query: getUserProfile,
                variables: {
                    userId: userid
                }
            } ],
            onQueryUpdated: (observableQuery) => {
                return observableQuery.refetch()
            },
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])
    console.log(lock)
    return (
        <div className={styles.container}>
            {
                data && message ? <div className={styles.message}>
                    <Message label='Success' message='You have benn successfully locked.' close={setMessage} status='success' /> </div> : null
            }
            <h2>Lock Account</h2>
            <div>
                <p>Locking a user account before deleting it can provide time to download necessary data, preventing them from creating requests or accessing sensitive information. This measure ensures all data is saved and protects sensitive information while complying with data protection regulations. </p>
            </div>
            <div className={styles.locked}>
                <form onSubmit={onHandleLockAccount}>
                    <button type="submit" onClick={() => setLocked(() => !lock)}>
                        {locked ? "Unlocked Account" : "Locked Account"}
                    </button>
                </form>
            </div>
        </div >
    )
}
