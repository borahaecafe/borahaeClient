import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/server/admin/user/create.module.scss';
import { createUserRoles } from '../../../../util/user/user.mutation';
import { useMutation } from '@apollo/client';
import { getAllUserQuery } from '../../../../util/user/user.query';
import Message from '../../../message/message';

const roles = [
    { name: "Vendor", value: "vendor" }
]


interface Users {
    email: string
    birthday: string
    firstname: string
    role: string
    lastname: string
    companyName: string
    phone: string
}
export default function Create({ close }: any) {

    const [ createUser, { data, error } ] = useMutation(createUserRoles)
    const [ message, setMessage ] = useState(false)

    const [ users, setUsers ] = useState<Users>({
        email: "",
        birthday: "",
        firstname: "",
        lastname: "",
        companyName: "",
        role: "",
        phone: ""
    })

    const onCreateUserBtn = (e: any) => {
        e.preventDefault();
        createUser({
            variables: {
                role: users.role,
                profile: {
                    birthday: users.birthday,
                    firstname: users.firstname,
                    lastname: users.lastname,
                    phone: `+63${users.phone}`
                },
                companyName: users.companyName,
                email: users.email
            },
            onCompleted: () => {
                setUsers({
                    birthday: "",
                    email: "",
                    firstname: "",
                    companyName: "",
                    lastname: "",
                    phone: "",
                    role: ""
                })
                setMessage(true)
            },
            onError: () => {
                setMessage(true)
            },
            refetchQueries: [ getAllUserQuery ],
            onQueryUpdated: async (observableQuery) => {
                return await observableQuery.refetch()
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
            {
                data && message ? <div className={styles.message
                }>
                    <Message label='Success' message='You have been successfully created a user.' status='success' close={setMessage} />
                </div> : null
            }
            {
                error && message ? <div className={styles.message
                }>
                    <Message label='Error' message='You should fill up all required field.' status='error' close={setMessage} />
                </div> : null
            }
            <div className={styles.header}>
                <h2>Add User</h2>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>

                </button>
            </div>
            <form onSubmit={onCreateUserBtn}>
                <input type="text" placeholder="Email Address" value={users.email} onChange={e => setUsers({ ...users, email: e.target.value })} />
                <div className={styles.pf}>

                    <input type="text" placeholder="Firstname" value={users.firstname} onChange={e => setUsers({ ...users, firstname: e.target.value })} />
                    <input type="text" placeholder="Lastname" value={users.lastname} onChange={e => setUsers({ ...users, lastname: e.target.value })} />
                </div>
                <input type="date" value={users.birthday} onChange={e => setUsers({ ...users, birthday: e.target.value })} />
                <input type="tel" value={users.phone} placeholder='091234567891' maxLength={11} onChange={e => setUsers({ ...users, phone: e.target.value })} />

                <select value={users.role} onChange={e => setUsers({ ...users, role: e.target.value })}>
                    <option>Select --</option>
                    {roles.map(({ name, value }) => (
                        <option key={name} value={value}>{name}</option>
                    ))}
                </select>

                {users.role === "vendor" ?
                    <input type="text" value={users.companyName} placeholder='Company Name' onChange={e => setUsers({ ...users, companyName: e.target.value })} /> : null}


                <button disabled={!users.email || !users.role || !users.firstname || !users.lastname || !users.phone} type="submit">Create User</button>
            </form>
        </div>
    )
}
