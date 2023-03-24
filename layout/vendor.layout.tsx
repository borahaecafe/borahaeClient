import React, { FC, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../components/server/sidebar'
import styles from '../styles/layouts/vendorlayout.module.scss'
import Header from '../components/server/header'


interface Props {
    children: ReactNode
}

const Vendor: FC<Props> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Header />
                {children}
            </div>
        </div>
    )
}


export default Vendor