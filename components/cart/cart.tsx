import React, { useEffect, useState, useRef } from 'react'
import styles from '../../styles/components/cart/cart.module.scss'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Cash from '../../public/server/icon/cash.svg'
import Credit from '../../public/server/icon/credit-card.svg'
import Gcash from '../../public/server/icon/coin.svg'
import CartCard from './cartCard'
import { CreateOrder } from '../../util/order/order.mutation'
import { cartItem } from '../../pages/_app'
import Message from '../message/message'
import { profileQuery } from '../../util/profile/profile.query'
import { useQuery, gql, useMutation } from '@apollo/client'
import { getCProduct } from '../../util/products/product.query'

export const GET_CART_ITEMS = gql`
    query getCartItems  {
        cartItems @client
    }`


export default function Cart() {


    const [ userid, setUserid ] = useState("");
    const [ message, setMessage ] = useState(false)
    const [ pay, setPay ] = useState("")
    const [ discount, setDiscount ] = useState(0)
    useEffect(() => {
        const cookie = Cookies.get("company_access_token");
        if (cookie) {
            const { userId, r }: any = jwtDecode(cookie)
            setUserid(userId)
        }
    }, [ userid ])


    const payment = [
        { name: "Cash", img: <Cash />, value: "cash" },
        { name: "Gcash", img: <Gcash />, value: "gcash" },
        { name: "BPI/BDO", img: <Credit />, value: "bpi/bdo" }
    ]

    const { loading, data } = useQuery(profileQuery, {
        variables: {
            userId: userid
        }
    })


    const { loading: cartLoad, data: cartData } = useQuery(GET_CART_ITEMS)



    const [ createOrder, { data: createOrderData, error } ] = useMutation(CreateOrder)


    const onHandleOrder = (e: any) => {
        e.preventDefault();
        cartData.cartItems.map(({ productID, quantity }: any) => {
            createOrder({
                variables: {
                    orderses: [
                        {
                            productID: productID,
                            payment: pay,
                            quantity: quantity,
                            discount: discount,
                            userID: userid,
                        }

                    ]
                },
                onCompleted: () => {
                    cartItem([])
                    setPay("")
                    setMessage(true)
                },
                refetchQueries: [ {
                    query: getCProduct,
                    variables: {
                        userId: userid
                    }
                } ],
                onQueryUpdated: (observableQuery) => {
                    return observableQuery.refetch()
                }
            })
        })

    }


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])

    return (
        <div className={styles.container}>
            {
                createOrderData && message ? <div className={styles.message}>
                    <Message label={'Success'} message={'You have successfully created an order.'} status={'success'} close={function (args: boolean): void {
                        throw new Error('Function not implemented.')
                    }} />
                </div> : null
            }
            <div className={styles.header}>
                {loading ? null : data.getProfileById.map(({ firstname, lastname, profileID }: any) => (
                    <div className={styles.profile} key={profileID}>
                        <div className={styles.shortcut}>
                            <span>{firstname[ 0 ]}</span>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.name}>{firstname} {lastname}</span>
                            <span className={styles.time}>{Intl.DateTimeFormat("en-PH", {
                                dateStyle: "full",
                            }).format(new Date())}</span>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.cart}>
                <div className={styles.cartContainer}>
                    {cartLoad ? null : cartData.cartItems.map(({ productID, title, price, quantity }: any) => (
                        <CartCard key={productID} quantity={quantity} price={price} title={title} id={productID} />
                    ))}
                </div>
            </div>
            <div className={styles.total}>
                <div>
                    <h2>Discount</h2>
                    <input type="text" value={discount} onChange={(e) => {
                        setDiscount(parseInt(e.target.value))
                        if (isNaN(parseFloat(e.target.value))) {
                            setDiscount(0)
                        }
                    }} />
                </div>
                <div>
                    <h2>Subtotal</h2>
                    <span>
                        {Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(cartData.cartItems.reduce((a: any, b: any) => (a + b.price * b.quantity - discount), 0))
                        }
                    </span>
                </div>
            </div>
            <div className={styles.payment}>
                {payment.map(({ name, value, img }) => (
                    <button onClick={() => {
                        setPay(() => value)
                        if (value === pay) {
                            setPay("")
                        }
                    }} className={value === pay ? styles.activebtn : styles.paymentbtn} key={name} value={value}>
                        {img}
                        <span>{name}</span>
                    </button>
                ))}
            </div>
            <div className={styles.placeorder}>
                <button disabled={!pay || cartData.cartItems.length === 0} onClick={onHandleOrder}>Place Order</button>
            </div>
        </div >
    )
}
