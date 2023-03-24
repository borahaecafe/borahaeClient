import React from 'react'
import styles from '../../styles/components/message/message.module.scss'
import Check from '../../public/server/icon/circle-check.svg'
import X from '../../public/server/icon/circle-x.svg'



interface Message {
    label: string,
    message: string,
    status: 'success' | 'error',
    close: (args: boolean) => void
}
export default function Message({ message, label, status, close }: Message) {
    return (
        <div className={styles.container}>
            <div className={styles.con}>
                <div className={styles.bar} style={status === "success" ? { backgroundColor: "#5ad24c" } : { backgroundColor: "#c62828" }} />
                <div className={styles.last}>
                    {status === "success" ? <Check /> : <X />}
                    <div className={styles.conMess}>
                        <h3>{label}</h3>
                        <span>{message}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bt}>
                <button onClick={() => close(false)}>Close</button>
            </div>
        </div>
    )
}
