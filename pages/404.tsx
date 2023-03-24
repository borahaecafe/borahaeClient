import React from 'react'
import styles from '../styles/main/404.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'
export default function NotFound() {
    const router = useRouter()



    return (
        <div className={styles.container}>
            <Head>
                <title>NOT FOUND</title>
            </Head>
            <h2>404</h2>
            <span>Oops! The page you were looking for doesn{"'"}t exist.</span>
            <button onClick={() => router.back()}>Go back</button>
        </div>
    )
}
