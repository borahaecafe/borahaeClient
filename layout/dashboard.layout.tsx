import React, { FC, ReactNode, useEffect, useState } from 'react'
import Sidebar from '../components/server/sidebar'
import styles from '../styles/layouts/dashboard.module.scss'
import Header from '../components/server/header'
import Cart from '../components/cart/cart'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface Props {
    children: ReactNode
}
const Dashboard: FC<Props> = ({ children }) => {

    const [ token, setToken ] = useState("")
    const router = useRouter()

    useEffect(() => {
        const cookie = Cookies.get("company_access_token")
        if (cookie) {
            setToken(cookie)
        }
    }, [])



    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                {router.pathname.includes("/menu") ? null : <Header />}
                {children}
            </div>
            {token && router.pathname.includes("/menu") ? <Cart /> : null}
        </div>
    )
}


export default Dashboard