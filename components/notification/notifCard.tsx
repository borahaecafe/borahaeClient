import React, { useState } from 'react'
import styles from '../../styles/components/notification/notificationCard.module.scss'
import { formatDistance } from 'date-fns'
import { useMutation } from '@apollo/client'
import { updateMyNotificaiton } from '../../util/notification/notification.mutation'
import { getNotiID, getNotificationByUser } from '../../util/notification/notification.query'

export default function NotifiCard({ status, firstname, lastname, date, title, clickCard, id, userid }: any) {


    const [ updateNoti ] = useMutation(updateMyNotificaiton)


    const onHandleNotification = () => {
        updateNoti({
            variables: {
                notificationId: id
            },
            refetchQueries: [ {
                query: getNotificationByUser,
                variables: {
                    userId: userid
                }
            } ],
            onQueryUpdated: (observableQuery) => {
                return observableQuery.refetch()
            }
        })
    }

    return (
        <div onClick={() => {
            clickCard(id)
            if (status === "unread") {
                onHandleNotification()
            }
        }} className={styles.card} style={status === "unread" ? { backgroundColor: "#eeee" } : {}}>
            <div className={styles.cardName}>
                <h2>{firstname[ 0 ]}{lastname[ 0 ]}</h2>
            </div>
            <div className={styles.cardBody}>
                <h2>{firstname} {lastname} wants to {title}</h2>
                <span>{formatDistance(new Date(date), Date.now(), {
                    addSuffix: true,
                })}</span>
            </div>
        </div>
    )
}
