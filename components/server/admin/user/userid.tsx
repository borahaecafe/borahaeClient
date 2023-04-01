import React, { useState } from 'react'
import styles from '../../../../styles/components/server/admin/user/userid.module.scss'
import X from '../../../../public/server/icon/x.svg'
import ResetPassword from './profile/resetpassword'
import Sales from './profile/sales'
import UserLogs from './profile/logs'
import UserOverview from './profile/overview'
import Locked from './profile/locked'

export default function UserId({ id, close, locked, role }: any) {

    const [ set, setSett ] = useState("overview")

    const sidebar = [
        { name: "Overview", value: "overview" },
        { name: "Report Sale", value: "sales" },
        { name: "Change password", value: "password" },
        { name: "Activity Log", value: "log" },
        { name: "Lock Account", value: "locked" }
    ]


    const AdminSidebar = [
        { name: "Overview", value: "overview" },
        { name: "Report Sale", value: "sales" },
        { name: "Change password", value: "password" },
        { name: "Activity Log", value: "log" },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {role === "vendor" ? sidebar.map(({ name, value }) => (
                    <button key={name} value={value} style={set === value ? { backgroundColor: "#F9F9F9", color: "#A020F0" } : { background: "transparent", color: "#FFFDD0" }} onClick={(e) => setSett(e.currentTarget.value)}>{name}</button>
                )) : AdminSidebar.map(({ name, value }) => (
                    <button key={name} value={value} style={set === value ? { backgroundColor: "#F9F9F9", color: "#A020F0" } : { background: "transparent", color: "#FFFDD0" }} onClick={(e) => setSett(e.currentTarget.value)}>{name}</button>
                ))}
            </div>
            <div className={styles.overview}>
                <div className={styles.close}>
                    <button onClick={() => close("")}>
                        <X />
                    </button>
                </div>
                <div className={styles.as}>
                    {set === "overview" ? <UserOverview userid={id} /> : null}
                    {set === "log" ? <UserLogs userid={id} /> : null}
                    {set === "sales" ? <Sales userid={id} /> : null}
                    {set === "password" ? <ResetPassword userid={id} /> : null}
                    {set === "locked" ? <Locked userid={id} locked={locked} /> : null}
                </div>
            </div>
        </div>
    )
}
