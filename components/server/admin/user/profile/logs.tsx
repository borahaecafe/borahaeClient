import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { UserLogs } from '../../../../../util/logs/logs.query'
import { format } from 'date-fns'
import styles from '../../../../../styles/components/server/admin/user/profile/userlogs.module.scss'
import Offset from '../../../../pagination/offset'
export default function UserLog({ userid }: any) {
    const [ pages, setPages ] = useState(0)

    const { loading, data } = useQuery(UserLogs, {
        variables: {
            userId: userid,
            first: 7,
            offset: pages * 7
        },
        pollInterval: 1000
    })

    if (loading) return null
    return (
        <div className={styles.container}>
            <h2>User Logs</h2>
            <div className={styles.tabCon}>
                <table>
                    <thead>
                        <tr>
                            <th>Activity Title</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getUserLog.map(({ logsID, log, createdAt }: any) => (
                            <tr key={logsID}>
                                <td>{log}</td>
                                <td>{format(new Date(createdAt), "MMM dd yyyy hh:mm:ss a")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Offset data={data} pages={pages} setPages={setPages} />
        </div>
    )
}
