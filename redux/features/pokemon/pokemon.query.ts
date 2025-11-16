import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './type'

const reducerPath = "pokemonApi"
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),

    endpoints: (builder) => ({
        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`,
        }),
    }),
})

export const pokemonQueryReducer = { [reducerPath]: pokemonApi.reducer }
// Client side
export const { useGetPokemonByNameQuery } = pokemonApi