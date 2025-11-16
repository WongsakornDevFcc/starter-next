import { configureStore } from '@reduxjs/toolkit'
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from "react-redux"
import { combinedReducer } from "./features"
import { pokemonApi } from './features/pokemon'
import  { userAPI }  from "./features/user"

import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist" //1. เก็บ state ให้ไม่หายหลังรีเฟรช 2. Restore state อัตโนมัติเมื่อเปิดเว็บใหม่ 3. ใช้ร่วมกับ Redux Toolkit ได้ดีมาก

export type RootState = ReturnType<typeof combinedReducer>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            userAPI.middleware,
            pokemonApi.middleware,
        ),
})


export const persistor = persistStore(store)

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export const useDispatch = () => useAppDispatch<AppDispatch>()
