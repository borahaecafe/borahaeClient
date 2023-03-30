import React, { useEffect, useState } from 'react'
import styles from '../../../../../styles/components/server/vendor/supply/supply.module.scss'
import X from '../../../../../public/server/icon/x.svg'
import CardSupply from '../../../../supply/supplycard'
import SuppliesCart from '../../../../supply/supplyCart'
import { getCProduct } from '../../../../../util/products/product.query'
import { useQuery, useMutation } from '@apollo/client'
import { SupplyCartQuery } from '../../../../supply/supplyCart'
import { ProductRequest } from '../../../../../util/request/request.mutation'
import { supplyCartItem } from '../../../../../pages/_app'
import Message from '../../../../message/message'
export default function Supply({ close, userid }: any) {

    const [ message, setMessage ] = useState(false)
    const { loading: loadSupply, data: supplyData, startPolling } = useQuery(SupplyCartQuery)

    const [ prodReq, { data: prodReqData } ] = useMutation(ProductRequest)

    const { loading, data, startPolling: startProductPolling } = useQuery(getCProduct, {
        variables: {
            userId: userid
        },
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network"
    })

    const onHandleRequest = () => {
        prodReq({
            variables: {
                vendorId: userid,
                productId: supplyData.supplyCartItems.map(({ productID }: any) => {
                    return productID
                })
            },
            onCompleted: () => {
                supplyCartItem([])
                setMessage(true)
            }
        })
    }

    useEffect(() => {
        setMessage(false)
    }, [ message ])

    useEffect(() => {
        startPolling(500)
        startProductPolling(500)
    }, [ startPolling, startProductPolling ])
    return (
        <div className={styles.container}>
            {prodReqData && data ? <div className={styles.message}>
                <Message label='Successs' message='You have successfully send a request.' close={setMessage} status="success" />
            </div> : null}
            <div className={styles.header}>
                <h2>Send Product</h2>
                <button onClick={() => close(false)}> <X /></button>
            </div>
            <div className={styles.items}>
                <div>
                    {loading ? null : data.getCompanyProducts.map(({ productID, title, price, stock, company }: any) => (
                        company.length === 2 ? null : <CardSupply key={productID} title={title} price={price} stock={stock} id={productID} company={company} />
                    ))}
                </div>
            </div>
            <div className={styles.req}>
                <div className={styles.item}>
                    <SuppliesCart />
                </div>
                <button onClick={onHandleRequest} type="button">Send</button>
            </div>
        </div>
    )
}
