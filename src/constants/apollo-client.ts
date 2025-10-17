import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";

import excludedRoutes from "./excludedRoutes";
import { onLogout } from "../utils/logout";

const logoutLink = onError(({ result }) => {
  console.log(result);
  const statusCode = (
    result?.errors?.[0]?.extensions?.originalError as
      | { statusCode?: number }
      | undefined
  )?.statusCode;

  if (result?.errors?.length && statusCode === 401) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include", // send cookies on cross-origin requests
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
