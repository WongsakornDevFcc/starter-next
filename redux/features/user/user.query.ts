import { createApi } from "@reduxjs/toolkit/query/react"
import customFetchBase from "../customFetchBase"

const reducerPath = "userAPI"
export const userAPI = createApi({
    reducerPath,
    baseQuery: customFetchBase,
    tagTypes: ["User"],
    endpoints(builder) {
        return {
            getUser: builder.query({
                query: (query) => {
                    return {
                        url: `/api/v1/user`,
                        method: "GET",
                    }
                },
                providesTags: ["User"],
            }),
        }
    },
})

export const userQueryReducer = { [reducerPath]: userAPI.reducer }
// Client side
export const { useLazyGetUserQuery } = userAPI