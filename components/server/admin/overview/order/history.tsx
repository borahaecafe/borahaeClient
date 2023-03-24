import React from 'react'
import styles from '../../../../../styles/components/server/admin/overview/history.module.scss'
export default function History({ product, total, title, id }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.prd}>
                <h2>{title}</h2>
                <span>{Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP"
                }).format(total)}</span>
            </div>
        </div>
    )
}
