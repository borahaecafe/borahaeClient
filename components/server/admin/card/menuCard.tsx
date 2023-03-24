import React, { useState } from 'react'
import styles from '../../../../styles/components/server/admin/menu/card.module.scss'
import Plus from '../../../../public/server/icon/plus.svg'
import Minus from '../../../../public/server/icon/minus.svg'
import { useReactiveVar } from '@apollo/client'
import { cartItem } from '../../../../pages/_app'

export default function MenuCard({ title, price, id, stock }: any) {

    const cartItemsVar = useReactiveVar(cartItem)

    let items = cartItemsVar.some((a: any) => a.productID === id)

    const [ quantity, setQuantity ] = useState(0)

    const onHandleCart = (e: any) => {
        e.preventDefault();
        cartItem(items ? cartItemsVar.filter((a: any) => a.productID !== id) : [ ...cartItemsVar, {
            productID: id,
            title: title,
            price: price,
            quantity: quantity
        } ] as any)
    }


    return (
        <div className={items ? styles.active : styles.card}>
            <div onClick={onHandleCart} className={styles.info} style={items ? { color: "#fff", zIndex: 1 } : {} && stock === 0 ? { pointerEvents: "none", cursor: "not-allowed" } : {}}>
                {stock === 0 ? <div className={styles.oos}>
                    <span>Out of Stock</span>
                </div> : null}
                <div className={styles.inf}>
                    <h2>{title}</h2>
                    <span>{Intl.NumberFormat("en-US", { style: "currency", currency: "PHP" }).format(price)}</span>
                </div>
                {stock === 0 ? null : <span>Remaining: {stock}</span>}
            </div>

            <div className={styles.btngrp} style={items ? { color: "#fff", zIndex: 1 } : {}}>
                {items ? null :
                    <button disabled={quantity === stock} onClick={() => setQuantity(() => quantity + 1)}>
                        <Plus />
                    </button>}
                <span>{quantity}</span>
                {items ? null : <button disabled={quantity === 0} onClick={() => setQuantity(() => quantity - 1)}>
                    <Minus />
                </button>}
            </div>

        </div >
    )
}
