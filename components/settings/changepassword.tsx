import React, { useState, useEffect } from 'react'
import styles from '../../styles/components/settings/password.module.scss'
import { useMutation } from '@apollo/client'
import { resetpass } from '../../util/auth/auth.mutation'
import Message from '../message/message'

interface Password {
    password: string
    retype: string
}

export default function ChangePassword({ userid }: any) {


    const [ pass, setPass ] = useState<Password>({
        password: "",
        retype: ""
    })
    const [ message, setMessage ] = useState(false)

    const [ resetPassword, { data, error } ] = useMutation(resetpass, {
        variables: {
            userId: userid,
            retype: pass.retype,
            password: pass.password
        },
        onCompleted: () => {
            setMessage(true)
            setPass({
                password: "",
                retype: ""
            })
        }
    })


    const onHandleResetPassword = (e: any) => {
        e.preventDefault()
        resetPassword()
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])
    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label='Success' message='You successfully changed your password.' status='success' close={setMessage} />
            </div> : null}
            <form onSubmit={onHandleResetPassword}>
                <div className={styles.inputContainer}>
                    <label>New Password</label>
                    <input type="password" placeholder='' value={pass.password} onChange={e => setPass({ ...pass, password: e.target.value })} />
                    <label>Retype Password</label>
                    <input type="password" placeholder='' value={pass.retype} onChange={e => setPass({ ...pass, retype: e.target.value })} />
                </div>
                <div className={styles.btnContainer}>
                    <button disabled={!pass.password || !pass.retype} type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}
