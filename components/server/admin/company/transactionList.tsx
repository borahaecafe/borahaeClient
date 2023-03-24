import React from 'react'
import styles from '../../../../styles/components/server/admin/transaction/transaction.module.scss'
import { useRouter } from 'next/router'
export default function TransactionList({ id, name, product, user, order }: any) {

    const router = useRouter()
    return (
        <div className={styles.bodyRow}>
            <div className={styles.bodyCell}>
                <div onClick={() => router.push(`/dashboard/a/transaction/${id}`)}>{name}</div>
                {
                    user.length === 0 ? <div>Deleted User</div> : user.map(({ profile }: any) => (
                        profile.map(({ firstname, lastname }: any) => (
                            <div key={name}>{firstname} {lastname}</div>
                        ))
                    ))
                }
                <div>{product.length}</div>
                <div>
                    {Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(order.reduce((a: any, b: any) => (a + b.total), 0))}
                </div>
            </div>
        </div>
    )
}
