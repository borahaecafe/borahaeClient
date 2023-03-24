import React, { useState, useEffect } from 'react'
import styles from '../../../../../styles/components/server/admin/user/profile/sales.module.scss'
import DatePicker from 'react-datepicker'
import { CSVLink } from 'react-csv'
import { getMyCompanyDetails } from '../../../../../util/company/company.query'
import { getTotalRev, getAllCompanySales, getAllCompanyRefund } from '../../../../../util/transaction/transaction.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { format, subDays } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import Message from '../../../../message/message'

const headers = [
    { label: "Item", key: "item" },
    { label: "Payment", key: "payment" },
    { label: "Date Ordered", key: "dateOrdered" },
    { label: "Quantity", key: "quantity" },
    { label: "Discount", key: "discount" },
    { label: "Status", key: "status" },
    { label: "Total", key: "total" }
]

export default function Sales({ userid }: any) {

    const [ startDate, setStartDate ] = useState(subDays(new Date(Date.now()), 15))
    const [ endDate, setEndDate ] = useState(new Date(Date.now()))
    const [ isRender, setIsRender ] = useState(false)
    const [ message, setMessage ] = useState(false)
    const { loading, data } = useQuery(getMyCompanyDetails, {
        variables: {
            userId: userid
        },
        onCompleted: () => {
            setIsRender(true)
        }
    })
    const [ filename, setFilename ] = useState("")
    const [ getSales, { data: getAllSales } ] = useMutation(getAllCompanySales)
    const [ getTotalSales, { data: getCompanyRevenue } ] = useMutation(getTotalRev)
    const [ getTotalRefund, { data: getCompanyRefund } ] = useMutation(getAllCompanyRefund)

    const onGetCompanySales = () => {
        getSales({
            variables: {
                userId: userid,
                start: startDate,
                end: endDate
            },
            onCompleted: () => {
                setMessage(true)
            }
        })
        getTotalSales({
            variables: {
                userId: userid,
                start: startDate,
                end: endDate
            },
        })
        getTotalRefund({
            variables: {
                userId: userid,
                start: startDate,
                end: endDate
            },
        })

    }

    useEffect(() => {
        if (isRender) {
            data.getCompanyDetails.map(({ companyName }: any) => {
                setFilename(`Report Sales ${companyName} ${new Date(Date.now()).toLocaleDateString()}`)
            })
        }
        setIsRender(false)
    }, [ data, endDate, isRender, startDate ])


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])

    const datas = getAllSales ? getAllSales.getAllSales.map(({ orderID, createdAt, discount,  total, payment, quantity, status, orderedProduct }: any) => {
        return {
            item: orderedProduct[ 0 ].title,
            payment: payment === "gcash" ? "GCASH" : null || payment === "cash" ? "CASH" : null || payment === "bpi/bdo" ? "BPI/BDO" : null,
            dateOrdered: format(new Date(createdAt), "MM dd, yyyy h:m:s a"),
            status: status === "approved" ? "Sold" : "Refund",
            discount: discount,
            total: Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total),
            quantity: quantity,
        }
    }) : null


    const getTotalRevenue = getCompanyRevenue ? getCompanyRevenue.getTotalSales.reduce((a: any, b: any) => (a + b.total), 0) : null
    const getTotlRefund = getCompanyRefund ? getCompanyRefund.getRefunded.reduce((a: any, b: any) => (a + b.total), 0) : null

    if (loading) return null
    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label={'Successs'} message={'You have successfully generate CSV'} status={'success'} close={setMessage} />
            </div> : null}
            <h2>Generate Report</h2>
            <div className={styles.date}>
                <div className={styles.dateContainer}>Start:  <DatePicker

                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    selectsStart={true}
                    startDate={startDate}
                    endDate={endDate}
                /></div>
                <div className={styles.dateContainer}>End:  <DatePicker

                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    selectsStart={true}
                    startDate={startDate}
                    endDate={endDate}
                /></div>
                <button onClick={onGetCompanySales} className={styles.generatebtn}>Generate</button>

            </div>
            <div className={styles.generateContainer}>
                {getAllSales ?
                    <CSVLink data={[ ...datas,
                    { item: "", total: "" },
                    { item: "Refunded", total: Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(getTotlRefund) },
                    { item: "Total Revenue", total: Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(getTotalRevenue), }
                    ]} headers={headers}
                        filename={filename}
                        className={styles.cvsfile}
                    >Export CSV</CSVLink> : null}
            </div>
        </div>
    )
}
