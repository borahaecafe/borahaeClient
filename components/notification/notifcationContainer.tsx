import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/notification/notification.module.scss'
import NotifiCard from './notifCard'
import X from '../../public/server/icon/x.svg'
import { getNotificationByUser, getNotiID } from '../../util/notification/notification.query'
import { useQuery } from '@apollo/client'
import { notifiSubscription } from '../../util/notification/notification.subscription'
import NotificatitonPreview from './notiPreview'

export default function Notification({ userid, close, roles }: any) {

    const [ noti, setNoti ] = useState("")

    const { loading, data, subscribeToMore } = useQuery(getNotificationByUser, {
        variables: {
            userId: userid
        }
    })


    const { loading: getNotiLoading, data: getNotiData } = useQuery(getNotiID, {
        variables: {
            notificationId: noti
        }
    })

    useEffect(() => {
        return subscribeToMore({
            document: notifiSubscription,
            variables: {
                userId: userid
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newPost = subscriptionData.data.notificationSubscriptions
                return {
                    getUserNotification: [ ...prev.getUserNotification, newPost ]
                }

            }
        })
    }, [ subscribeToMore, userid ])

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.head}>
                    <h2>Notification</h2>
                </div>
                <div className={styles.lowerBody}>
                    {loading ? null : data.getUserNotification.map(({ userID, notification }: any) => (
                        notification.map(({ createdAt, title, notificationID, request, notificationStatus }: any) => (
                            request.map(({ user }: any) => (
                                user.map(({ profile }: any) => (
                                    profile.map(({ firstname, lastname }: any) => (
                                        <NotifiCard
                                            userid={userID}
                                            key={notificationID} id={notificationID} clickCard={setNoti} status={notificationStatus} firstname={firstname} lastname={lastname} title={title} date={createdAt} />
                                    ))
                                ))
                            ))
                        ))
                    ))}
                </div>
            </div>
            <div className={styles.preview}>
                <div className={styles.hprev}>
                    <button onClick={() => close(false)}>
                        <X />
                    </button>
                </div>
                {noti ?
                    <div className={styles.bprev}>
                        {getNotiLoading ? null : getNotiData.getNotificationID.map(({ notificationID, request, createdAt, title }: any) => (
                            <NotificatitonPreview key={notificationID} id={notificationID} title={title} request={request} date={createdAt} userid={userid} roles={roles}/>
                        ))}
                    </div> : null}
            </div>
        </div>
    )
}
