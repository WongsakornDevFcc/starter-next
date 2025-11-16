import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./user"
import pokemonReducer from "./pokemon"

export const combinedReducer = combineReducers({
    ...userReducer,
    ...pokemonReducer,
})
