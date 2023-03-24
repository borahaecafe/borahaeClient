import React from 'react'
import styles from '../../../../styles/components/server/admin/product/product.module.scss'
import Chart from './chart/chart'

export default function Preview({ gpidload, data, setProdId, id }: any) {
    return (
        <div className={styles.productView}>
            {gpidload ? null : data.getProductID.map(({ productID, title, stock, sku, price, orders }: any) => (
                <div className={styles.prodquery} key={productID}>
                    <div className={styles.productEditBtn}>
                        <button onClick={() => setProdId("")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>

                        </button>
                    </div>
                    <div className={styles.header}>
                        <div className={styles.avatar}>
                            <span>{title[ 0 ]}
                            </span>
                        </div>.
                        <div className={styles.info}>
                            <h2>{title}</h2>
                            <span>{sku}</span>
                        </div>
                        <div className={styles.sp}>
                            <div>
                                <h3>Stock</h3>
                                <span>{stock}</span>
                            </div>

                            <div>
                                <h3>Price</h3>
                                <span>{Intl.NumberFormat("en-PH", {
                                    style: "currency",
                                    currency: "PHP"
                                }).format(price)}</span>
                            </div>
                            <div>
                                <h3>Orders</h3>
                                <span>{orders.length}</span>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            <div className={styles.charts}>
                <Chart id={id} />
            </div>
        </div>
    )
}