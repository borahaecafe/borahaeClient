import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import styles from '../../../../styles/components/server/admin/orders/order.module.scss'
import { useMutation } from '@apollo/client'
import { UpdateOrder } from '../../../../util/order/order.mutation'
import { getAllOrders } from '../../../../util/order/order.query'
import Message from '../../../message/message'
const statused = [
    { name: "Approved", value: "approved" },
    { name: "Refunded", value: "refund" }
]

export default function OrderList({ id, date, quantity, total, sku, payment, status, title }: any) {

    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState(false)

    const [ updateMyOrder, { data } ] = useMutation(UpdateOrder)
    const onHandleOrderStatus = (e: any) => {
        updateMyOrder({
            variables: {
                orderId: id,
                status: e.target.value
            },
            onCompleted: () => {
                setOpen(false)
                setMessage(true)
            },
            refetchQueries: [ getAllOrders ],
            onQueryUpdated: observableQuery => {
                return observableQuery.refetch()
            }
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])
    return (
        <div className={styles.bodyRow}>
            {data && message ? <div className={styles.message}>
                <Message close={setMessage} label={'Success'} message={'You have been successfully updated'} status={'success'} />
            </div> : null}
            <div className={styles.bodyCell}>
                <div>{title}</div>
                <div>{quantity}</div>
                <div>{sku}</div>
                <div>{Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP"
                }).format(total)}</div>

                <div>{
                    payment === "gcash" ? "GCASH" : null

                }
                    {
                        payment === "bpi/bdo" ? "BDO/BPI" : null

                    }
                    {
                        payment === "cash" ? "CASH" : null

                    }
                </div>
                <div>{format(new Date(date), "MMM dd, yyyy h:m:ss a")}</div>
                <div className={styles.btn}>
                    <button className={styles.btnCLick} about={`${status}`} onClick={() => setOpen(() => !open)} >
                        {status === "approved" ? "Approved" : null}
                        {status === "refund" ? "Refunded" : null}
                    </button>
                    {open ? <div className={styles.orderbtng}>
                        {statused.map(({ value, name }) => (
                            <button onClick={onHandleOrderStatus} key={name} value={value}>{name}</button>
                        ))}
                    </div> : null}
                </div>
            </div>
        </div>
    )
}
