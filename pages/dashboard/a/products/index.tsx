import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import jwtDecode from 'jwt-decode'
import styles from '../../../../styles/components/server/admin/product/product.module.scss'
import CreateProduct from '../../../../components/server/admin/products/create'
import { gpId, gpUser } from '../../../../util/products/product.query'
import { useQuery, useLazyQuery } from '@apollo/client'
import { searchGql } from '../../../../util/search/search.query'
import ProductList from '../../../../components/server/admin/products/productList'
import Preview from '../../../../components/server/admin/products/preview'
import { getUserProfile } from '../../../../util/user/user.query'
const Product: FC = ({ userid }: any) => {

    const [ create, setCreate ] = useState(false)
    const [ search, setSearch ] = useState("")
    const [ prodId, setProdId ] = useState("")
    const [ isRender, setRender ] = useState(false)
    const [ getMySKU, setMySku ] = useState("")

    const { data } = useQuery(getUserProfile, {
        variables: {
            userId: userid
        },
        onCompleted: () => {
            setRender(true)
        }
    })


    useEffect(() => {
        if (isRender) {
            data.getUserID.map(({ profile, company }: any) => {
                profile.map(({ firstname, lastname }: any) => {
                    company.map(({ companyName }: any) => {
                        setMySku(`${firstname[ 0 ]}${lastname[ 0 ]}${companyName[ 0 ]}`)
                    })
                })
            })
        }
    }, [ isRender, data ])

    const [ searchProduct, { data: searchProd } ] = useLazyQuery(searchGql)

    const { loading: gpidload, data: getpdid } = useQuery(gpId, {
        variables: {
            productId: prodId
        },

    })

    const { loading: loadProd, data: getAll } = useQuery(gpUser, {
        variables: {
            userId: userid
        }

    })


    const onChangeSearch = (e: any) => {
        searchProduct({
            variables: {
                sku: search,
                userId: userid
            },
        })

        setSearch(e.target.value)
    }



    return (
        <div className={styles.container}>
            <Head>
                <title>Product</title>
            </Head>
            {create ?
                <div className={styles.itemHov}>
                    <CreateProduct userid={userid} close={setCreate} />
                </div>
                : null}


            <div className={styles.productList}>
                <div className={styles.header}>
                    <div className={styles.filterhead}>
                        <input type="text" onChange={onChangeSearch} placeholder='Search Product Item' />
                    </div>
                    <div className={styles.btn}>
                        <button onClick={() => setCreate(() => !create)}>
                            Add
                        </button>

                    </div>

                </div>

                <div className={styles.body}>
                    <div className={styles.table}>
                        <div className={styles.headerRow}>
                            <div className={styles.head}>
                                <div>Title</div>
                                <div>SKU</div>
                                <div>Stock</div>
                                <div>Price</div>
                                <div>Actions</div>
                            </div>
                        </div>
                        {search ? searchProd?.getSearchProduct.map(({ productID, description, title, category, sku, stock, price }: any) => (
                            <ProductList ides={prodId} mySku={getMySKU} key={productID} setd={setProdId} category={category} description={description} productID={productID} title={title} sku={sku} price={price} stock={stock} userid={userid} />
                        )) :
                            loadProd ? null : getAll.getProductsByUser.map(({ productID, sku, description, category, stock, title, price }: any) => (
                                <ProductList ides={prodId} mySku={getMySKU} key={productID} setd={setProdId} category={category} description={description} productID={productID} title={title} sku={sku} price={price} stock={stock} userid={userid} />

                            ))}
                    </div>

                </div>
            </div>
            {
                prodId ?
                    <Preview gpidload={gpidload} data={getpdid} setProdId={setProdId} id={prodId} /> :
                    null
            }
        </div>
    )
}



(Product as PageWithLayout).layout = Dashboard

export default Product

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]

    const { userId }: any = jwtDecode(cookies)

    return {
        props: {
            userid: userId
        }
    }

}