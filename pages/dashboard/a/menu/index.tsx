import React, { FC, useState } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/server/admin/menu/menu.module.scss'
import { getCProduct } from '../../../../util/products/product.query'
import jwtDecode from 'jwt-decode'
import { useLazyQuery, useQuery } from '@apollo/client'
import MenuCard from '../../../../components/server/admin/card/menuCard'
import { findSKUProduce } from '../../../../util/search/search.query'

const Menu: FC = ({ userid }: any) => {

    const [ search, setSearch ] = useState("")

    const { loading, data } = useQuery(getCProduct, {
        variables: {
            userId: userid
        },
    })

    const [ findSKU, { data: SKUdata } ] = useLazyQuery(findSKUProduce)

    const onSearchChange = (e: any) => {
        findSKU({
            variables: {
                userId: userid,
                sku: search
            }
        })
        setSearch(e.target.value)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Menu</title>
            </Head>
            <div className={styles.searchInput}>
                <input type="search" value={search} onChange={onSearchChange} placeholder='Search SKU' />
            </div>
            <div className={styles.productContainer}>
                {
                    search.length !== 0 ? SKUdata?.getSearchSKU.map(({ productID, stock, price, title }: any) => (
                        <MenuCard key={productID} stock={stock} id={productID} userid={userid} title={title} price={price} />
                    )) :
                        loading ? null : data.getCompanyProducts.map(({ productID, title, price, stock }: any) => (
                            <MenuCard key={productID} stock={stock} id={productID} userid={userid} title={title} price={price} />
                        ))}
            </div>
        </div>
    )
}


export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]

    const { userId }: any = jwtDecode(cookies)

    return {
        props: {
            userid: userId
        }
    }

}


(Menu as PageWithLayout).layout = Dashboard
export default Menu