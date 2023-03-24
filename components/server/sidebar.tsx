import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/sidebar.module.scss'
import Cookies from 'js-cookie'
import Image from 'next/image'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import Settings from '../settings/settings'






export default function Sidebar() {


    const [ id, setId ] = useState("")
    const [ role, setRoles ] = useState("")
    const [ setting, setSetting ] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const cookies = Cookies.get("company_access_token");
        if (cookies) {
            const { userId, r }: any = jwtDecode(cookies)
            setRoles(r)
            setId(userId)
        }
    }, [ role, id ])

    const admin = [
        { name: "Overview", url: `/dashboard/a/overview`, icon: "/server/sidebar/dashboard.svg" },
        { name: "Products", url: `/dashboard/a/products`, icon: "/server/sidebar/box.svg" },
        { name: "Menu", url: `/dashboard/a/menu`, icon: "/server/sidebar/menu-order.svg" },
        { name: "Orders", url: `/dashboard/a/orders`, icon: "/server/sidebar/paper-bag.svg" },
        { name: "Transaction", url: `/dashboard/a/transaction`, icon: "/server/sidebar/packages.svg" },
        { name: "User", url: `/dashboard/a/users`, icon: "/server/sidebar/user.svg" },

    ]

    const vendor = [
        { name: "Overview", url: `/dashboard/v/`, icon: "/server/sidebar/dashboard.svg" },
        { name: "Products", url: `/dashboard/v/products`, icon: "/server/sidebar/box.svg" },
        { name: "Transaction", url: `/dashboard/v/transaction`, icon: "/server/sidebar/packages.svg" },
    ]



    return (
        <div className={styles.container}>
            {
                setting ?
                    <div className={styles.settings}>
                        <Settings userid={id} role={role} close={setSetting} />
                    </div> : null
            }
            <div className={styles.con}>
                <nav>
                    <ul>
                        {role == "administrator" ? admin.map(({ name, url, icon }) => (
                            <li onClick={() => router.push(url)} className={router.asPath == url ? styles.active : ""} key={name}>
                                <Image src={icon} alt={name} height={25} width={25} />
                                <div className={styles.tooltip}>
                                    <span>{name}</span>
                                </div>
                            </li>
                        )) : null}
                        {role == "vendor" ? vendor.map(({ name, url, icon }) => (
                            <li onClick={() => router.push(url)} className={router.asPath == url ? styles.active : ""} key={name}>
                                <Image src={icon} alt={name} height={25} width={25} />
                                <div className={styles.tooltip}>
                                    <span>{name}</span>
                                </div>
                            </li>
                        )) : null}
                    </ul>
                </nav>
            </div>
            <div className={styles.profBtnCon}>
                <button onClick={() => setSetting(() => !setting)}>
                    <Image src="/server/sidebar/settings.svg" alt="" height={20} width={20} />
                </button>
                <div className={styles.tooltip}>
                    <span>Settings</span>
                </div>
            </div>
        </div>
    )
}
