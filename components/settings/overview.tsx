import React from 'react'
import { getUserProfile } from '../../util/user/user.query'
import styles from '../../styles/components/settings/overview.module.scss'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'

export default function Overview({ userid }: any) {

    const { loading, data } = useQuery(getUserProfile, {
        variables: {
            userId: userid
        }
    })

    if (loading) return null
    return (
        <div className={styles.container}>
            <h2>Account Overview</h2>
            <table>
                {data.getUserID.map(({ userID, email, profile, company }: any) => (
                    profile.map(({ firstname, lastname, phone, birthday }: any) => (
                        <tbody key={userID}>
                            <tr>
                                <th>Email</th>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{firstname} {lastname}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{phone}</td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>{format(new Date(birthday), "MMMM dd, yyy")}</td>
                            </tr>
                            {company.map(({ companyID, companyName }: any) => (
                                <tr key={companyID}>
                                    <th>Company Name</th>
                                    <td>{companyName}</td>
                                </tr>
                            ))}
                        </tbody>
                    ))
                ))}
            </table>
        </div>
    )
}
