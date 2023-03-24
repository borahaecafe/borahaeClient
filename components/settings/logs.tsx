import React, { useState } from 'react'
import { UserLogs } from '../../util/logs/logs.query'
import { useQuery } from '@apollo/client'
import styles from '../../styles/components/settings/logs.module.scss'
import { format } from 'date-fns'
import Offset from '../pagination/offset'

export default function Logs({ userid }: any) {

    const [ pages, setPages ] = useState(0)

    const { loading, data } = useQuery(UserLogs, {
        variables: {
            userId: userid,
            first: 8,
            offset: pages * 8
        },
        pollInterval: 1000
    })

    if (loading) return <p>Loading</p>
    return (
        <div className={styles.container}>
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
                                <td>{format(new Date(createdAt), "MMMM dd, yyyy hh:mm:ss a")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Offset data={data} pages={pages} setPages={setPages} />
        </div>
    )
}
