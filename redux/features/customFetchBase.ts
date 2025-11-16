import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { getSession } from "next-auth/react"
import Cookies from "js-cookie"
import { signOut } from "next-auth/react"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  
  async prepareHeaders(headers) {
    const session = await getSession()
    headers.set("authorization", `Bearer ${session?.tokens.access}`)
    headers.set("Content-Type", "application/json");
    headers.set("locale", Cookies.get("NEXT_LOCALE") || "th")
    
    return headers
  },
})

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401 && window) signOut()
  else if (result.error && result.error.status === 403 && window)
    window.location.href = "/error/403"
  else if (result.error && result.error.status === 404 && window)
    window.location.href = "/error/404"

  return result
}

export default customFetchBase
