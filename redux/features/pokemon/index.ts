import { pokemonQueryReducer } from "./pokemon.query"

const pokemonReducer = {
    ...pokemonQueryReducer,
}

export * from "./pokemon.query"
export default pokemonReducer