import { FC } from "react";
import PageWithLayout from "../../../layout/pagewithlayout";
import VendorLayout from "../../../layout/vendor.layout";
import jwtDecode from "jwt-decode";
import Head from 'next/head'
import styles from '../../../styles/components/server/vendor/overview/overview.module.scss'
import TransactionVendor from "../../../components/server/vendor/overview/transaction/transactionVendor";
import Orders from "../../../components/server/vendor/overview/chart/orders";
import Revenue from "../../../components/server/vendor/overview/chart/revenue";
import Product from "../../../components/server/vendor/overview/chart/product";
import Overall from "../../../components/server/vendor/overview/chart/overall";


const Vendor: FC = ({ userid }: any) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Overview</title>
            </Head>
            <div className={styles.containerHeader}>
                <div className={styles.box}>
                    <Product userid={userid} />
                </div>
                <div className={styles.box}>
                    <Orders userid={userid} />
                </div>

                <div className={styles.box}>
                    <Revenue userid={userid} />
                </div>
                <div className={styles.box}>
                    <Overall userid={userid} />
                </div>
            </div>
            <div className={styles.containerBody}>
                <div className={styles.containerTransaction}>
                    <TransactionVendor userid={userid} />
                </div>
            </div>
        </div>
    )
}

(Vendor as PageWithLayout).layout = VendorLayout
export default Vendor

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]
    const { userId }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userId
        }
    }
}