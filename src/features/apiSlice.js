import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postSlice = createApi({
    reducerPath: 'postSlice',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9006/api/v1/" }),
    endpoints: (builder) => ({
        getAllCategorys: builder.query({
            query: () => '/categorys',
        }),
        addCategorys: builder.query({
            query: (cat) => ({
                url: '/add',
                method: 'POST',
                body: cat,
            })
        })
    })

})
export const { useGetAllCategorys, addCategorys } = postSlice;