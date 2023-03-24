import React, { useState } from 'react'
import styles from '../../styles/components/cart/cartCard.module.scss'
import Trash from '../../public/server/icon/trash.svg'
import { useReactiveVar } from '@apollo/client'
import { cartItem } from '../../pages/_app'



export default function CartCard({ quantity, title, price, id }: any) {
    const [ open, setOpen ] = useState(false)

    let cartItemsVAR = useReactiveVar(cartItem)

    const onHandleDeleteCard = (e: any) => {
        e.preventDefault();
        cartItem(cartItemsVAR.filter((a: any) => a.productID !== id))
    }
    return (
        <div className={styles.card}>
            {open ?
                <button onClick={onHandleDeleteCard}>
                    <Trash />
                </button> : null
            }
            <div onClick={() => setOpen(() => !open)} className={styles.productCard} key={id}>
                <div className={styles.dc}>
                    <h2>{title}</h2>
                    <span>x{quantity}</span>
                </div>
                <span>{Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(price * quantity)}</span>
            </div>
        </div>
    )
}
