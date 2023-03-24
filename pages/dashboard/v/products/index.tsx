import React, { FC, useState } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import VendorLayout from '../../../../layout/vendor.layout'
import styles from '../../../../styles/components/server/vendor/product.module.scss'
import CreateVendor from '../../../../components/server/vendor/products/create'
import Head from 'next/head'
import jwtDecode from 'jwt-decode'
import ProductList from '../../../../components/server/vendor/products/productList'
import Supply from '../../../../components/server/vendor/products/supply/supply'
import { gpUser } from '../../../../util/products/product.query'
import { useQuery, useLazyQuery } from '@apollo/client'
import { searchGql } from '../../../../util/search/search.query'


const Products: FC = ({ userid }: any) => {

    const { loading, data, } = useQuery(gpUser, {
        variables: {
            userId: userid
        },
        pollInterval: 500
    })

    const [ search, setSearch ] = useState("")

    const [ searchProd, { data: searchData } ] = useLazyQuery(searchGql)

    const onHandleSearch = (e: any) => {
        searchProd({
            variables: {
                sku: search,
                userId: userid
            }
        })

        setSearch(e.target.value)
    }

    const [ create, setCreate ] = useState(false)

    const [ supply, setSupply ] = useState(false)
    return (
        <div className={styles.container}>
            <Head>
                <title>Product Inventory</title>
            </Head>
            {
                create ?
                    <div className={styles.createVendor}>
                        <CreateVendor close={setCreate} userid={userid} />
                    </div> :
                    null
            }
            {
                supply ?
                    <div className={styles.supply}>
                        <Supply close={setSupply} userid={userid} />
                    </div> :
                    null
            }
            <div className={styles.productContainer}>
                <div className={styles.header}>
                    <input type="search" placeholder='Search product or SKU' onChange={onHandleSearch} />
                    <div className={styles.btnGrp}>
                        <button onClick={() => setCreate(() => !create)}>
                            Create Product
                        </button>
                        <button onClick={() => setSupply(() => !supply)}>
                            Send Product
                        </button>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.table}>
                        <div className={styles.headerRow}>
                            <div className={styles.head}>
                                <div>Product Name</div>
                                <div>SKU</div>
                                <div>Stock</div>
                                <div>Price</div>
                                <div>Actions</div>
                            </div>
                        </div>
                        {search.length !== 0 ? searchData?.getSearchProduct.map(({ productID, title, sku, stock, price }: any) => (
                            <ProductList key={productID} title={title} userid={userid} sku={sku} stock={stock} price={price} />
                        )) : loading ? null : data.getProductsByUser.map(({ productID, title, sku, stock, price }: any) => (
                            <ProductList key={productID} id={productID} userid={userid} title={title} sku={sku} stock={stock} price={price} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


(Products as PageWithLayout).layout = VendorLayout




export default Products

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]

    const { userId }: any = jwtDecode(cookies)

    return {
        props: {
            userid: userId
        }
    }

}