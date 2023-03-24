import React, { useState, useEffect } from 'react'
import { getMyCompanyDetails } from '../../util/company/company.query'
import { useQuery, useMutation } from '@apollo/client'
import styles from '../../styles/components/settings/company.module.scss'
import { companyDets, updateCompDets } from '../../util/company/company.mutation'
import Message from '../message/message'

interface Company {
    name: string
    city?: string
    street?: string
    zipcode?: string
    province?: string
}
export default function Company({ userid }: any) {

    const [ cid, setCid ] = useState("")
    const [ message, setMessage ] = useState(false)
    const [ companies, setCompanies ] = useState<Company>({
        name: "",
        city: "",
        zipcode: "",
        province: "",
        street: ""
    })


    const [ isRender, setRender ] = useState(false)

    const { loading, data } = useQuery(getMyCompanyDetails, {
        variables: {
            userId: userid
        },
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
        onCompleted: () => {
            setRender(true)
        }

    })

    const [ createCompanyDetails, { data: companyData, error } ] = useMutation(companyDets)
    const [ updateCompanyDetails, { data: UpdateCompany, error: updateError } ] = useMutation(updateCompDets)

    useEffect(() => {
        if (isRender) {
            data.getCompanyDetails.map(({ companyID, companyName, companyAddress }: any) => {
                setCid(companyID)
                if (companyAddress.length === 0) {

                    setCompanies({
                        ...companies,
                        name: companyName,
                    })
                } else {
                    companyAddress.map(({ city, street, province, zipcode }: any) => {
                        setCompanies({
                            ...companies,
                            name: companyName,
                            city, province, street, zipcode
                        })
                    })
                }
            })
        }
        setRender(false)
    }, [ companies, data, isRender, cid ])



    const onHandelForm = (e: any) => {
        e.preventDefault()
        createCompanyDetails({
            variables: {
                companyId: cid,
                address: {
                    city: companies.city,
                    province: companies.province,
                    street: companies.street,
                    zipcode: companies.zipcode
                }
            },
            onCompleted: () => { setMessage(true) },
            onError: () => {
                setMessage(true)
            },
            refetchQueries: [ { query: getMyCompanyDetails, variables: { userId: userid } } ],
            onQueryUpdated: (observaryQuery) => {
                return observaryQuery.refetch()
            }
        })
    }


    const onUpdateForm = (e: any) => {
        e.preventDefault()
        updateCompanyDetails({
            variables: {
                companyId: cid,
                address: {
                    city: companies.city,
                    province: companies.province,
                    street: companies.street,
                    zipcode: companies.zipcode
                }
            },
            onCompleted: () => { setMessage(true) },
            onError: () => {
                setMessage(true)
            },
            refetchQueries: [ { query: getMyCompanyDetails, variables: { userId: userid } } ],
            onQueryUpdated: (observaryQuery) => {
                return observaryQuery.refetch()
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])


    if (loading) return null

    return (
        <div className={styles.container}>
            {companyData || UpdateCompany && message ? <div className={styles.message}>
                <Message label='Success' message='You have successfully update your details.' status='success' close={setMessage} />
            </div> : null}
            {error || updateError && message ? <div className={styles.message}>
                <Message label='Error' message='There something wrong while updating' status='error' close={setMessage} />
            </div> : null}
            <form>
                <label>Company Name</label>
                <input type="text" disabled defaultValue={companies.name} />
                <label>City</label>
                <input type="text" value={companies.city} onChange={e => setCompanies({ ...companies, city: e.target.value })} />
                <label>Street</label>
                <input type="text" value={companies.street} onChange={e => setCompanies({ ...companies, street: e.target.value })} />
                <div className={styles.ds}>
                    <div>
                        <label>Province</label>
                        <input type="text" value={companies.province} onChange={e => setCompanies({ ...companies, province: e.target.value })} />
                    </div>
                    <div>
                        <label>Zipcode</label>
                        <input type="text" maxLength={4} value={companies.zipcode} onChange={e => setCompanies({ ...companies, zipcode: e.target.value })} />
                    </div>
                </div>
                <div className={styles.formBtn}>
                    {data.getCompanyDetails[ 0 ].companyAddress.length === 0 ? <button disabled={!companies.city || !companies.province || !companies.street || !companies.zipcode} onClick={onHandelForm}>Save</button> : <button onClick={onUpdateForm}>Update</button>}

                </div>
            </form>
        </div>
    )
}
