import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Cookies from 'js-cookie'
import { AuthLogin } from '../util/auth/auth.mutation'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import Message from '../components/message/message'
import OTP from '../components/otp/otp'
import { recerateOTP } from '../util/otp/otp.mutation'
import PageOne from '../components/main/page/pageOne'
import PageTwo from '../components/main/page/pageTwo'
import PageThree from '../components/main/page/pageThree'

interface Auth {
  email: string
  password: string
}

export default function Home() {

  const router = useRouter()
  const [ auth, setAuth ] = useState<Auth>({
    email: "",
    password: ""
  })



  const [ token, setToken ] = useState("")
  const [ roles, setRoles ] = useState("")
  const [ message, setMessage ] = useState(false)
  const [ otpMessage, setOtpMessage ] = useState(false)
  const [ otp, setOtp ] = useState(false)
  const [ page, setPage ] = useState(1)
  useEffect(() => {
    const cookies = Cookies.get("company_access_token")
    if (cookies) {
      const { userId, r }: any = jwtDecode(cookies)
      setToken(userId)
      setRoles(r)
    }
  }, [])

  const [ login, { data, error } ] = useMutation(AuthLogin, {
    variables: {
      email: auth.email,
      password: auth.password
    },
    onCompleted: (data) => {
      const token = Cookies.set("company_access_token", data.login.token, {
        sameSite: "none",
        secure: true,
        expires: 60 * 60 * 24 * 7
      })

      if (token) {
        const { r }: any = jwtDecode(token)
        if (r === "administrator") {
          router.push(`/dashboard/a/overview`)
        } else if (r === "vendor") {
          router.push(`/dashboard/v`)
        }
      }


      setMessage(true)
    },
    onError: (e) => {
      setMessage(true)
      setOtp(false)
    },
  })

  const onHandleAuthentication = () => {
    login()
  }


  const [ sendOTP, { data: otpSent, error: otpError } ] = useMutation(recerateOTP, {
    variables: {
      email: auth.email
    },

    onCompleted: () => {
      setOtpMessage(true)
    },
    onError: () => {
      setOtpMessage(true)

    },
  })


  const onHandleOTP = () => {
    sendOTP()
  }

  useEffect(() => {

    setTimeout(() => {
      setMessage(false)

    }, 2000)

  }, [ message ])

  useEffect(() => {
    setTimeout(() => {
      setOtpMessage(false)
    }, 2000)
  }, [ otpMessage ])


  useEffect(() => {
    const interval = setInterval(() => {
      setPage(page + 1)
      if (page === 3) {
        setPage(1)
      }
    }, 6000)


    return () => clearInterval(interval)
  }, [ page ])

  return (
    <>
      <Head>
        <title>Borahae Cafe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {data && message ?
          <div className={styles.message}>
            <Message label='Success' message='You successfully login' status='success' close={setMessage} />
          </div> : null
        }
        {
          otp ? <div className={styles.open}>
            <OTP close={setOtp} email={auth.email} form={onHandleAuthentication} />
          </div> : null
        }
        {error && message ?
          <div className={styles.message}>
            <Message label='Error' message={error.message} status='error' close={setMessage} />
          </div> : null
        }
        {otpSent && otpMessage ?
          <div className={styles.message}>
            <Message label='Success' message='You OTP successfully sent to your email.' status='success' close={setMessage} />
          </div> : null
        }
        {otpError && otpMessage ?
          <div className={styles.message}>
            <Message label='Error' message={`${error?.message}`} status='error' close={setMessage} />
          </div> : null
        }
        <div className={styles.column1}>
          <h2>Borahae Cafe</h2>
          {roles === "administrator" ? <Link href={`${`/dashboard/a/overview`}`}>Go to Dashboard</Link> : null}
          {
            roles === "vendor" ? <Link href={`${`/dashboard/v`}`}>Go to Dashboard</Link> : null
          }
          {
            token ? null :
              <form >
                <input type="email" placeholder='Email Address' value={auth.email} onChange={e => setAuth({ ...auth, email: e.target.value })} />
                <input type="password" placeholder='Password' value={auth.password} onChange={e => setAuth({ ...auth, password: e.target.value })} />
                <button disabled={auth.email.length === 0 && auth.email.includes("@") || auth.password.length === 0} type="button"
                  onClick={(e) => {
                    onHandleOTP()
                    setOtp(() => !otp)
                  }}>Login</button>
                <span>Interested to have your own physical display? <Link href="mailto:borahaecafepos@gmail.com">Contact us now! :)</Link></span>
              </form>
          }
        </div>
        <div className={styles.column2}>
          {page === 1 ? <PageOne /> : null}
          {page === 2 ? <PageTwo /> : null}
          {page === 3 ? <PageThree /> : null}
        </div>
      </div>
    </>
  )
}
