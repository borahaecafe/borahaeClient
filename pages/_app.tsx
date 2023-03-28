import '../styles/globals.scss'
import { useEffect } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, split, makeVar, createHttpLink } from '@apollo/client'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import PageWithLayout from '../layout/pagewithlayout'
import Nprogress from 'nprogress'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const cartItem = makeVar([])
export const supplyCartItem = makeVar([])

type AppLayoutPage = {
  Component: PageWithLayout
  pageProps: any
  router: any
}

const createLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
})


const webSocketLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
  url: `ws://localhost:4000/graphql`,

})) : null



const splitLink = typeof window !== "undefined" && webSocketLink !== null ? split(({ query }) => {
  const definition = getMainDefinition(query)

  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'

}, webSocketLink, createLink) : createLink



export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItems: {
            read() {
              return cartItem()
            }
          },
          supplyCartItems: {
            read() {
              return supplyCartItem()
            }
          },
          getUserNotification: {
            merge: (existing = [], incoming: any[]) => {
              return incoming
            }
          },
          getCompanyProducts: {
            merge: (existing = [], incoming: any[]) => {
              return incoming
            }
          },
          getUnreadNotification: {
            merge: (existing = [], incoming: any[]) => {
              return incoming
            }
          }
        }
      }
    }
  })
})

export default function App({ Component, pageProps }: AppLayoutPage) {
  const router = useRouter();
  router.events?.on("routeChangeStart", () => {
    Nprogress.start()
  })

  router.events?.on("routeChangeComplete", () => {
    Nprogress.done()
  })
  router.events?.on("routeChangeError", () => { Nprogress.done() })
  const Layout = Component.layout || (({ children }: any) => <>{children}</>)

  const cookies = Cookies.get("company_access_token");

  useEffect(() => {
    if (cookies) {
      const { exp }: any = jwtDecode(cookies)
      if (exp === new Date().getTime()) {
        Cookies.remove("company_access_token");
        router.push("/")
      }

    }
  }, [cookies, router])
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
