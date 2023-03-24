import React, { useState } from 'react'
import styles from '../../../../styles/components/server/admin/user/user.module.scss'
import UserPrev from './userid'
import DeleteUser from './delete'
import { format } from 'date-fns'



export default function UserList({ userID, role, profile, date, company, locked }: any) {


    const [ id, setId ] = useState("")
    const [ del, setDel ] = useState("")
    return (
        <div key={userID} className={styles.bodyRow}>
            {id ?
                <div className={styles.prev}>
                    <UserPrev id={id} close={setId} locked={locked} />
                </div> : null}
            {del ?
                <div className={styles.del}>
                    <DeleteUser id={del} close={setDel} />
                </div> : null}
            <div className={styles.bodyCell}>
                {profile.map(({ firstname, lastname }: any) => (
                    <div className={styles.avatar} key={firstname}><div>{firstname[ 0 ]}{lastname[ 0 ]}</div></div>
                ))}
                {profile.map(({ firstname, lastname }: any) => (
                    <div key={firstname}>{firstname} {lastname}</div>
                ))}
                {company.map(({ companyID, companyName }: any) => (
                    <div key={companyID}>{companyName}</div>
                ))}
                <div className={styles.roles}>{role}</div>
                <div>{format(new Date(date), "MMM dd, yyyy")}</div>
                <div className={styles.ac}>
                    <button onClick={() => setId(() => userID)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                        </svg>
                    </button>
                    <button onClick={() => setDel(() => userID)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 25 25" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
