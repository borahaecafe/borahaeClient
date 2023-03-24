import React, { FC, useState } from 'react'
import styles from '../../../../styles/components/server/admin/user/user.module.scss'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import { useQuery, useLazyQuery } from '@apollo/client'
import { getAllUserQuery, getUserBySearch } from '../../../../util/user/user.query'

import Head from 'next/head'
import UserList from '../../../../components/server/admin/user/userList'
import Create from '../../../../components/server/admin/user/create'

const User: FC = () => {

    const [ add, setAdd ] = useState(false)
    const [ search, setSearch ] = useState("")
    const { loading, data: getAll } = useQuery(getAllUserQuery, {
        variables: {
            limit: 10, offset: 0
        }
    })

    const [ searchUser, { data: getSearch } ] = useLazyQuery(getUserBySearch)


    const onSearchChange = (e: any) => {
        searchUser({
            variables: {
                search,
                limit: 10, offset: 0
            }
        })

        setSearch(e.target.value)
    }

    if (loading) return null


    return (
        <div className={styles.container}>
            <Head>
                <title>User</title>
            </Head>
            {
                add ?
                    <div className={styles.add}>
                        <Create close={setAdd} />
                    </div> : null
            }
            <div className={styles.userContainer}>
                <div className={styles.header}>
                    <div className={styles.searchFilter}>
                        <input type="search" placeholder="Find a User" onChange={onSearchChange} className={styles.searchFilter} />
                    </div>
                    <div className={styles.btn}>
                        <button onClick={() => setAdd(() => !add)} className={styles.adduser}>

                            <span>Add User</span>
                        </button>

                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.table}>
                        <div className={styles.headerRow}>
                            <div className={styles.head}>
                                <div className={styles.avatar}>Avatar</div>
                                <div>Name</div>
                                <div>Company Name</div>
                                <div>Roles</div>
                                <div>Date Added</div>
                                <div>Actions</div>
                            </div>
                        </div>
                        {search ? getSearch?.searchUserByName.map(({ userID, profile, role, createdAt, company, locked }: any) => (
                            <UserList key={userID} userID={userID} role={role} profile={profile} date={createdAt} company={company} locked={locked} />
                        )) : loading ? null : getAll.getAllUsers.map(({ userID, profile, role, createdAt, company, locked }: any) => (
                            <UserList key={userID} userID={userID} role={role} profile={profile} date={createdAt} company={company} locked={locked} />
                        ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}



(User as PageWithLayout).layout = Dashboard
export default User