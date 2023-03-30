import React, { FC, useState } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/server/admin/transaction/transaction.module.scss'
import { useLazyQuery, useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { transactionQuery } from '../../../../util/transaction/transaction.query'
import { searchCompany } from '../../../../util/search/search.query'

import TransactionList from '../../../../components/server/admin/company/transactionList'
const Orders: FC = () => {


    const [ search, setSearch ] = useState("")


    const [ companySearch, { data: searchData } ] = useLazyQuery(searchCompany)

    const { loading, data } = useQuery(transactionQuery)


    const handleSearch = (e: any) => {
        companySearch({
            variables: {
                search: search
            }
        })
        setSearch(e.target.value)
    }
    return (
        <div>
            <Head>
                <title>Transaction</title>
            </Head>
            <div className={styles.container}>
                <Head>
                    <title>Transaction</title>
                </Head>
                <div className={styles.transactionContainer}>
                    <div className={styles.searchcompany}>
                        <input type="search" placeholder="Search Company" onChange={handleSearch} />
                    </div>
                    <div className={styles.companyTable}>
                        <div className={styles.headerRow}>
                            <div className={styles.head}>
                                <div>Company Name</div>
                                <div>Owner</div>
                                <div>Product</div>
                                <div>Total Revenue</div>
                            </div>
                        </div>
                        {search.length !== 0 ? searchData?.getSearchCompany.map(({ companyName, companyID, user, orders, product }: any) => (
                            <TransactionList key={companyID} id={companyID} user={user} name={companyName} order={orders} product={product} />
                        )) : loading ? null : data?.getAllCompanyUser.map(({ companyID, companyName, orders, product, user }: any) => (
                            <TransactionList key={companyID} id={companyID} user={user} name={companyName} order={orders} product={product} />
                        ))}

                    </div>
                </div>
            </div >
        </div>
    )
}


(Orders as PageWithLayout).layout = Dashboard
export default Orders

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]

    const { userId }: any = jwtDecode(cookies)

    return {
        props: {
            userid: userId
        }
    }

}