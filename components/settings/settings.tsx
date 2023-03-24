import React, { useState } from 'react'
import styles from '../../styles/components/settings/settings.module.scss'
import X from '../../public/server/icon/x.svg'
import Logs from './logs'
import ChangePassword from './changepassword'
import Profile from './profile'
import Overview from './overview'
import Company from './company'

export default function Settings({ role, userid, close }: any) {

    const [ set, setSett ] = useState("overview")

    const sidebar = [
        { name: "Overview", value: "overview" },
        { name: "Profile", value: "profile" },
        { name: "Company", value: "company" },
        { name: "Change password", value: "password" },
        { name: "Activity Log", value: "log" },

    ]
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {sidebar.map(({ name, value }) => (
                    <button key={name} value={value} style={set === value ? { backgroundColor: "#F9F9F9", color: "#A020F0" } : { background: "transparent", color: "#FFFDD0" }} onClick={(e) => setSett(e.currentTarget.value)}>{name}</button>
                ))}
            </div>

            <div className={styles.view}>
                <div className={styles.close}>
                    <button className={styles.closeBtn} onClick={() => close(false)}>
                        <X />
                    </button>
                </div>
                <div className={styles.conView}>
                    {set === "overview" ? <Overview userid={userid} /> : null}
                    {set === "company" ? <Company userid={userid} /> : null}
                    {set === "profile" ? <Profile userid={userid} /> : null}
                    {set === "password" ? <ChangePassword userid={userid} /> : null}
                    {set === "log" ? <Logs userid={userid} /> : null}
                </div>
            </div>
        </div>
    )
}
