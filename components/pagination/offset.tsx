import React from 'react'
import ArrowLeft from '../../public/server/icon/arrow-left.svg'
import ArrowRight from '../../public/server/icon/arrow-right.svg'
import styles from '../../styles/components/pagination/offset.module.scss'



export default function Offset({ pages, setPages, data }: any) {


    return (
        <div className={styles.container}>
            <button disabled={!pages} onClick={() => setPages(pages - 1)}>
                <ArrowLeft />
            </button>
            <span>{pages + 1}</span>
            <button disabled={data.getUserLog.length < 7 || data.getUserLog.length === 0} onClick={() => setPages(pages + 1)}>
                <ArrowRight />
            </button>
        </div>
    )
}
