import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/notification/notification.module.scss'
import { format } from 'date-fns'
import { UpdateRequest } from '../../util/request/request.mutation'
import { useMutation } from '@apollo/client'
import { getNotiID } from '../../util/notification/notification.query'
import Message from '../message/message'

const updateButtons = [
    { name: "Reject", value: "rejected" },
    { name: "Approve", value: "approved" }
]

export default function NotificatitonPreview({ id, request, date, title, userid, roles }: any) {


    const [ requestId, setRequestId ] = useState("")
    const [ status, setStatus ] = useState("")
    const [ message, setMessage ] = useState(true)
    useEffect(() => {
        request.map(({ requestID, status }: any) => {
            setRequestId(requestID)
            setStatus(status)
        })
    }, [ request, requestId ])

    const [ updateARequest, { data, error } ] = useMutation(UpdateRequest)

    const onHandleUpdateReq = (e: any) => {
        updateARequest({
            variables: {
                userId: userid,
                requestId: requestId,
                status: e.target.value
            },
            onCompleted: () => {
                setMessage(true)
            },
            onError: () => {
                setMessage(true)
            },
            refetchQueries: [ {
                query: getNotiID,
                variables: {
                    notificationId: id
                }
            } ],
            onQueryUpdated: (observableQuery) => {
                return observableQuery.refetch()
            }
        })
    }

    useEffect(() => {
        setTimeout(() => { setMessage(false) }, 2000)
    }, [ message ])
    return (
        <div key={id}>
            {data && message ?
                <div className={styles.message}>
                    <Message label="Success" message='You have successfully updated.' status="success" close={setMessage} />
                </div> : null
            }
            {error && message ?
                <div className={styles.message}>
                    <Message label="Error" message='There was an error while updating.' status="error" close={setMessage} />
                </div> : null
            }
            <div className={styles.headerPrev}>
                <div>
                    <h2>{title}</h2>
                    <span className={styles.dates}>{format(new Date(date), "MMMM dd, yyyy hh:m:s a")}</span>
                </div>
                {roles === "administrator" ?
                    <div className={styles.btnGrp}>
                        {status === "approved" ? <span>Approved</span> : null}
                        {status === "rejected" ? <span>Rejected</span> : null}
                        {status === "waiting" ? updateButtons.map(({ name, value }) => (
                            <button onClick={onHandleUpdateReq} key={value} value={value}>{name}</button>
                        )) : null}
                    </div> : null}
            </div>
            {
                request.map(({ message, productRequest }: any) => (
                    <div key={2}>
                        <span>{message}</span>
                        <div className={styles.prodc}>
                            {productRequest.length === 0 ?
                                <div className={styles.prodel}>
                                    <span>Product Item Deleted.</span>
                                </div> : productRequest.map(({ title }: any) => (
                                    <div key={title}>
                                        <li>{title}</li>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))
            }
        </div >
    )
}
