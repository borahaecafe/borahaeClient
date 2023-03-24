import React, { useEffect, useState } from 'react'
import styles from '../../../../../styles/components/server/admin/user/profile/resetpass.module.scss'
import { useMutation } from '@apollo/client'
import { updateUserPass } from '../../../../../util/user/user.mutation'
import Message from '../../../../message/message'

export default function ResetPassword({ userid }: any) {


    const [ updatePass, { data } ] = useMutation(updateUserPass)
    const [ message, setMessage ] = useState(false)

    const onHandleResetPassword = (e: any) => {
        e.preventDefault()
        updatePass({
            variables: {
                userId: userid
            },
            onCompleted: () => {
                setMessage(true)
            },

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
                <Message label={'Successs'} message={'You successfully reset a password'} status={'success'} close={setMessage}
                />
            </div> : null}
            <h2>Reset Password</h2>
            <p>When you click the reset button, it will automatically reset the password to a default one. The default password is your birthday Format: <b>YYYYMMDD.</b></p>
            <button onClick={onHandleResetPassword}>Reset Password</button>
        </div>
    )
}
