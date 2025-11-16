import { userQueryReducer } from "./user.query"

const userReducer = {
    ...userQueryReducer,
}

export * from "./user.query"
export default userReducer
