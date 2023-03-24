import React, { useEffect, useState, useRef } from 'react'
import styles from '../../styles/otp/otp.module.scss'
import X from '../../public/server/icon/x.svg'
import { useMutation } from '@apollo/client'
import { verification, recerateOTP } from '../../util/otp/otp.mutation'
import Message from '../message/message'


export default function OTP({ close, email, form }: any) {

    const [ timer, setTimer ] = useState(300)
    const [ message, setMessage ] = useState(false)

    const nextComponent0 = useRef<HTMLInputElement>(null)
    const nextComponent1 = useRef<HTMLInputElement>(null)
    const nextComponent2 = useRef<HTMLInputElement>(null)
    const nextComponent3 = useRef<HTMLInputElement>(null)


    const [ verificationOTP, { data, error } ] = useMutation(verification)
    const [ resentOTP, { data: resData, error: resError } ] = useMutation(recerateOTP)
    useEffect(() => {
        if (!timer) return
        const interval = setInterval(() => {
            setTimer(timer - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [ timer ])


    const [ count, setCount ] = useState({
        one: "",
        two: "",
        three: "",
        four: ""
    })

    useEffect(() => {
        if (!count.one || !count.two || !count.three || !count.four) return

        verificationOTP({
            variables: {
                otp: `${count.one}${count.two}${count.three}${count.four}`
            },
            onCompleted: () => {
                form()
                setMessage(true)
            },
            onError: () => {
                setMessage(true)
            }
        })
    }, [ count.four, count.one, count.three, count.two, form, verificationOTP ])


    const onHandelResendOtp = (e: any) => {
        e.preventDefault()
        resentOTP({
            variables: {
                email: email
            },
            onCompleted: () => {
                setMessage(true)
            },
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])

    return (
        <div className={styles.container}>
            {
                error && message ? <div className={styles.message}>
                    <Message label={'Error'} message={`${error.message}`} status={'error'} close={setMessage} />
                </div> : null
            }
            <h2>Enter your OTP</h2>
            <span>Enter the code that has been sent to your email, {email} </span>
            <div className={styles.otp}>
                <input type="text" ref={nextComponent0} autoFocus maxLength={1} value={count.one}
                    onChange={(e) => {
                        setCount({ ...count, one: e.target.value })
                        if (e.target.value.length === 1) {
                            nextComponent1.current?.focus()
                        }
                    }
                    } />
                <input type="text" ref={nextComponent1} maxLength={1} value={count.two}
                    onChange={(e) => {
                        if (e.target.value.length === 1) {
                            nextComponent2.current?.focus()
                        }

                        if (e.target.value.length === 0) {
                            nextComponent0.current?.focus()
                        }
                        setCount({ ...count, two: e.target.value })
                    }} />


                <input type="text" ref={nextComponent2} maxLength={1} value={count.three}
                    onChange={(e) => {
                        setCount({ ...count, three: e.target.value })
                        if (e.target.value.length === 1) {
                            nextComponent3.current?.focus()
                        }

                        if (e.target.value.length === 0) {
                            nextComponent1.current?.focus()
                        }

                    }} />
                <input type="text" ref={nextComponent3}
                    maxLength={1} value={count.four}
                    onChange={(e) => {
                        setCount({ ...count, four: e.target.value })
                        if (e.target.value.length === 0) {
                            nextComponent2.current?.focus()
                        }

                    }
                    } />
            </div>
            {timer === 0 ? <button onClick={onHandelResendOtp}>Resend OTP</button> :
                <span>{timer}s</span>}
            <button onClick={() => close(false)} className={styles.closeBtn}>
                <X />
            </button>
        </div>
    )
}
