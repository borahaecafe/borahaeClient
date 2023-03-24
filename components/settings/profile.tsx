import React, { useState, useEffect } from 'react'
import { getUserProfile } from '../../util/user/user.query'
import { updateUserProfiles } from '../../util/user/user.mutation'
import { useQuery, useMutation } from '@apollo/client'
import styles from '../../styles/components/settings/profile.module.scss'

interface Profile {
    email: string
    firstname: string
    lastname: string
    phone: string
    birthday: string
}

export default function Profile({ userid }: any) {
    const [ isRender, setRender ] = useState(false)


    const { loading, data, error } = useQuery(getUserProfile, {
        variables: {
            userId: userid
        },
        onCompleted: () => {
            setRender(true)
        }
    })


    const [ prof, setProfile ] = useState<Profile>({
        birthday: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: ""
    })

    const [ updateMyProfile ] = useMutation(updateUserProfiles, {
        variables: {
            profile: {
                birthday: prof.birthday,
                firstname: prof.firstname,
                lastname: prof.lastname,
                phone: prof.phone
            },
            userId: userid
        }
    })

    useEffect(() => {
        if (isRender) {
            data.getUserID.map(({ email, profile }: any) => {
                profile.map(({ firstname, lastname, phone, birthday }: any) => {
                    setProfile({
                        ...prof,
                        birthday: birthday,
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        phone: phone
                    })
                })
            })
        }

        setRender(false)

    }, [ data, isRender, prof ])

    if (loading) return null


    const onHandleProfielUpdate = (e: any) => {
        e.preventDefault()
        updateMyProfile()
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onHandleProfielUpdate}>
                <label>Email</label>
                <input type="text" value={prof.email} onChange={e => setProfile({ ...prof, email: e.target.value })} />
                <div className={styles.fl}>
                    <div>
                        <label>Firstname</label>
                        <input type="text" value={prof.firstname} onChange={e => setProfile({ ...prof, firstname: e.target.value })} />
                    </div>
                    <div>
                        <label>Lastname</label>
                        <input type="text" value={prof.lastname} onChange={e => setProfile({ ...prof, lastname: e.target.value })} />
                    </div>
                </div>
                <label>Birthday</label>
                <input type="date" value={prof.birthday} onChange={e => setProfile({ ...prof, birthday: e.target.value })} />
                <label>Phone</label>
                <input type="tel" value={prof.phone} maxLength={13} onChange={e => setProfile({ ...prof, phone: e.target.value })} />
                <div className={styles.formBtn}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div >
    )
}
