import React from 'react'
import { gql, useQuery, useReactiveVar } from '@apollo/client'
import styles from '../../styles/components/server/vendor/supply/supplyCart.module.scss'
import X from '../../public/server/vendor/trash.svg'
import { supplyCartItem } from '../../pages/_app'


export const SupplyCartQuery = gql`
query getSupplyItems  {
    supplyCartItems @client
}`
export default function SupplyCart() {
    const SupplyCart = useReactiveVar(supplyCartItem)
    const { loading, data } = useQuery(SupplyCartQuery)


    if (loading) return null

    return (
        <div className={styles.container}>
            {data.supplyCartItems.map(({ productID, title }: any) => (
                <div className={styles.prod} key={productID}>
                    <button onClick={() => {
                        supplyCartItem(SupplyCart.filter((a: any) => a.productID !== productID))
                    }}>
                        <X />
                    </button>
                    <span>{title[ 0 ]}</span>
                </div>
            ))}
        </div>
    )
}