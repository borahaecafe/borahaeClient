import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/server/admin/product/create.module.scss'
import { createProducts } from '../../../../util/products/product.mutation'
import { useMutation } from '@apollo/client'
import { gpUser } from '../../../../util/products/product.query'
import Message from '../../../message/message'

interface CreateProduct {
  title: string
  price: number
  stock: number
}

export default function CreateProduct({ close, userid }: any) {

  const [ create, setCreate ] = useState<CreateProduct>({
    title: "",
    price: "" as unknown as number,
    stock: "" as unknown as number,
  })
  const [ message, setMessage ] = useState(false)


  const [ createProd, { data } ] = useMutation(createProducts)

  const onCreateProducts = (e: any) => {
    e.preventDefault();
    createProd({
      variables: {
        proudct: {
          price: create.price,
          stock: create.stock,
          title: create.title
        },
        userId: userid

      },
      onCompleted: () => {
        setMessage(true)
        setCreate({
          title: "",
          price: "" as unknown as number,
          stock: "" as unknown as number
        })
      },
      refetchQueries: [ {
        query: gpUser,
        variables: {
          userId: userid
        }
      } ],
      onQueryUpdated: (observableQuery) => {
        return observableQuery.refetch()
      }
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setMessage(false)
    }, 2000)
  }, [ message ])
  return (
    <div className={styles.container}>
      {data && message ? <div className={styles.message}>
        <Message label='Success' message='You have been successfully created a request.' status='success' close={setMessage} />
      </div> : null}
      <div className={styles.header}>
        <h2>Create Product</h2>
        <button onClick={() => close(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className={styles.createCon}>
        <form onSubmit={onCreateProducts}>
          <div className={styles.createInfo}>
            <input type="text" placeholder='Product title' value={create.title} onChange={e => setCreate({ ...create, title: e.target.value })} />
            <div className={styles.pq}>
              <input
                type="text"
                value={create.stock}
                onChange={e => {
                  setCreate({ ...create, stock: parseInt(e.target.value) })
                  if (isNaN(parseInt(e.target.value))) {
                    setCreate({ ...create, stock: 0 })
                  }
                }} placeholder='Stock'

              />
              <input type="text"
                value={create.price} onChange={e => {
                  setCreate({ ...create, price: parseInt(e.target.value) })
                  if (isNaN(parseInt(e.target.value))) {
                    setCreate({ ...create, price: 0 })
                  }
                }}
                placeholder='Price' />
            </div>
            <button className={styles.sbBtn} type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}
