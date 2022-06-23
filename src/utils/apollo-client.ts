import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GATEWAY_URL,
})
const unauthorizedLink = onError(({ networkError }) => {
  if (
    networkError &&
    'statusCode' in networkError &&
    (networkError.statusCode === 401 || networkError.statusCode === 403)
  ) {
    // window.location.href = "/unauthorized";
  }
})
export const getApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(
      process.env.REACT_APP_SESSION_TOKEN_KEY as string,
    )
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  return new ApolloClient({
    link: authLink.concat(unauthorizedLink).concat(httpLink),
    cache: new InMemoryCache(),
  })
}
