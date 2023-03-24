import React, { useRef, useState, useEffect } from 'react'
import styles from '../../styles/components/headers.module.scss'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import Bell from '../../public/server/icon/bell.svg'
import { useQuery } from '@apollo/client'
import { profileQuery } from '../../util/profile/profile.query'
import { useRouter } from 'next/router'
import Notification from '../../components/notification/notifcationContainer'
import { client } from '../../pages/_app'
import { getUnreadNotif } from '../../util/notification/notification.query'
export default function Header() {


    const [ token, setToken ] = useState("")
    const [ roles, setRoles ] = useState("")
    const [ notif, setNotif ] = useState(false)
    const [ open, setOpened ] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const getToken = Cookies.get("company_access_token")
        if (getToken) {
            const { userId, r }: any = jwtDecode(getToken)
            setToken(userId)
            setRoles(r)
        }
    }, [ token ])


    const { loading: loadNotif, data: dataNotif, startPolling } = useQuery(getUnreadNotif,
        {

            variables: {
                userId: token
            }
        })
    const { loading, data } = useQuery(profileQuery, {
        variables: {
            userId: token
        }
    })


    console.log(dataNotif)

    const onClickedBtn = () => {
        setOpened(() => !open)
    }
    const onLogoutBtn = () => {
        Cookies.remove("company_access_token")
        client.resetStore()
        router.push("/")
    }

    useEffect(() => {
        startPolling(1000)
    }, [ startPolling ])


    if (loadNotif) return null


    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <button onClick={() => setNotif(() => !notif)} className={dataNotif.getUnreadNotification.length !== 0 ? styles.active : styles.notifBell}>
                    {dataNotif.getUnreadNotification.length !== 0 ? <div className={styles.notiflength}>{dataNotif.getUnreadNotification.length}</div> : <span>
                        <Bell />
                    </span>}
                </button>
                {notif ?
                    <div className={styles.notification}>
                        <Notification userid={token} close={setNotif} roles={roles} />
                    </div> : null}

                {loading ? null : data.getProfileById.map(({ profileID, firstname, lastname }: any) => (
                    <button onClick={onClickedBtn} className={styles.card} key={profileID}>
                        <span>{firstname[ 0 ]}{lastname[ 0 ]}</span>
                    </button>
                ))}
                {open ?
                    <div className={styles.optionbtn}>
                        <button onClick={onLogoutBtn}>Logout</button>
                    </div> : null}
            </div>
            <div>
            </div>
        </div>
    )
}
