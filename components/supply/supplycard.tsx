import React from 'react'
import styles from '../../styles/components/server/vendor/supply/card.module.scss'
import { useReactiveVar, useMutation } from '@apollo/client'
import { supplyCartItem } from '../../pages/_app'
import { ProductRequest } from '../../util/request/request.mutation'

export default function CardSupply({ title, price, stock, id }: any) {

    const SupplyCart = useReactiveVar(supplyCartItem)

    let itemsInCart = SupplyCart.some((a: any) => a.productID === id)


    return (
        <div onClick={() => itemsInCart ? supplyCartItem(SupplyCart.filter((a: any) => a.productID !== id)) : supplyCartItem([ ...SupplyCart, {
            productID: id,
            title: title
        } ] as any)} className={styles.card}>
            <div className={itemsInCart ? styles.active : styles.deactivate} />
            <div className={styles.info} style={itemsInCart ? { color: "#fff" } : { color: "#000" }}>
                <h2>{title}</h2>
                <span>Stock: {stock}</span>
            </div>

        </div>
    )
}
